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

    // 1. 검색 인덱스 가져오기 (RAG 로직)
    const baseUrl = new URL(request.url).origin;
    const indexResponse = await fetch(baseUrl + "/data/search-index.json");
    let blogContext = "";

    if (indexResponse.ok) {
      const searchIndex = await indexResponse.json();
      
      // 질문을 단어로 분리하여 키워드 매칭
      const keywords = prompt.split(/\s+/).filter(k => k.length > 1);
      
      const matches = searchIndex.map(item => {
        let score = 0;
        const searchText = `${item.title} ${item.summary} ${item.content}`.toLowerCase();
        keywords.forEach(k => {
          if (searchText.includes(k.toLowerCase())) score++;
        });
        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

      if (matches.length > 0) {
        blogContext = matches.map((m, i) => `${i + 1}. 제목: ${m.title}, 요약: ${m.summary}`).join("\n");
      }
    }

    // 2. 시스템 프롬프트 구성
    const systemPrompt = `You are an AI assistant for a Korean local information blog.
Answer ONLY in Korean. Keep answers to 2-3 sentences maximum.
Do NOT use any markdown symbols (**, *, #, -). Plain text only.
Base your answer ONLY on the following blog data. If not relevant, reply: 해당 내용은 블로그에서 확인이 어렵습니다. 다른 질문을 해주세요.

[블로그 데이터]
${blogContext || "검색된 데이터가 없습니다."}`;

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

    // 4. 마크다운 기호 제거 (stripMarkdown)
    answer = answer
      .replace(/[#*`~_\-]/g, '')
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
