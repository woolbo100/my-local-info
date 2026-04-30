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

    // Workers AI 호출
    const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [
        {
          role: "system",
          content: `당신은 부산 지역 정보를 전문적으로 안내하는 '부산 나우(Busan Now)'의 AI 도우미입니다. 
          부산의 축제, 맛집, 생활 정보, 복지 혜택 등에 대해 친절하고 정확하게 답변해야 합니다. 
          모든 답변은 한국어로 작성하며, 사용자가 현재 시점에 맞는 정보를 얻을 수 있도록 노력하세요. 
          오늘의 날짜는 2026년 4월 30일입니다. 최신 트렌드와 정보를 반영하여 답변하고, 
          확실하지 않은 정보에 대해서는 블로그의 최신 포스팅을 확인하도록 안내하세요.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
    });

    // 모델에 따라 결과 형식이 다를 수 있으므로 체크 (일반적으로 { response: "..." })
    const answer = response.response || response.text || "죄송합니다. 답변을 생성할 수 없습니다.";

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
