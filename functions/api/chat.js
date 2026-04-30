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
          content: "You are an AI assistant for a Korean local information blog. Answer in Korean.",
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
