export async function onRequestPost(context) {
  const { env, request } = context;
  
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "질문이 입력되지 않았습니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. 검색 인덱스 가져오기 (RAG 로직 개선)
    const baseUrl = new URL(request.url).origin;
    const indexResponse = await fetch(baseUrl + "/data/search-index.json");
    let blogContext = "";

    if (indexResponse.ok) {
      const searchIndex = await indexResponse.json();
      
      // 질문에서 조사 제거 및 키워드 추출 (단순화)
      const cleanPrompt = prompt.replace(/[?.,!]/g, ' ');
      const keywords = cleanPrompt.split(/\s+/).filter(k => k.length > 0);
      
      const matches = searchIndex.map(item => {
        let score = 0;
        const title = (item.title || "").toLowerCase();
        const summary = (item.summary || "").toLowerCase();
        const content = (item.content || "").toLowerCase();
        const category = (item.category || "").toLowerCase();

        keywords.forEach(k => {
          const kw = k.toLowerCase();
          if (title.includes(kw)) score += 10;    // 제목 일치는 높은 점수
          if (summary.includes(kw)) score += 5;   // 요약 일치는 중간 점수
          if (content.includes(kw)) score += 1;   // 본문 일치는 낮은 점수
          if (category.includes(kw)) score += 3;  // 카테고리 일치
        });
        
        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

      if (matches.length > 0) {
        blogContext = matches.map((m, i) => `${i + 1}. 제목: ${m.title}\n요약: ${m.summary}`).join("\n\n");
      }
    }

    // 2. 시스템 프롬프트 구성 (지침 강화)
    const systemPrompt = `You are an AI assistant for a Korean local information blog named 'Busan Now'.
Answer ONLY in Korean. Keep answers to 2-3 sentences maximum.
Do NOT use any markdown symbols (**, *, #, -, \`, >). Plain text only.
Your primary goal is to provide information based on the provided [Blog Data].

[Blog Data]
${blogContext || "관련된 블로그 포스팅을 찾지 못했습니다."}

Instructions:
1. If relevant information exists in [Blog Data], summarize it kindly in 2-3 sentences.
2. If [Blog Data] is empty or not relevant to the question, reply exactly: "해당 내용은 블로그에서 확인이 어렵습니다. 다른 질문을 해주세요."
3. Do not use Markdown. Use plain text only.`;

    // 3. Workers AI 호출
    const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
    });

    let answer = aiResponse.response || aiResponse.text || "죄송합니다. 답변을 생성할 수 없습니다.";

    // 4. 마크다운 기호 제거 (stripMarkdown) - 응답 정제
    answer = answer
      .replace(/[#*`~_\->]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "AI 서버 오류가 발생했습니다: " + error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
