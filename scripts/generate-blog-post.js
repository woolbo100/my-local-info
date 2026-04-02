const fs = require('fs');
const path = require('path');

async function generateBlogPost() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error("환경변수 GEMINI_API_KEY가 없습니다.");
    return;
  }

  const postsDir = path.join(__dirname, '../src/content/posts');
  const dataFilePath = path.join(__dirname, '../public/data/local-info.json');

  // 1단계. 최신 데이터 확인
  if (!fs.existsSync(dataFilePath)) {
    console.log("데이터 파일이 없습니다.");
    return;
  }

  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  if (data.length === 0) {
    console.log("데이터가 없습니다.");
    return;
  }

  const lastItem = data[data.length - 1];
  const targetName = lastItem.name;

  // 기존 파일들과 비교 (Frontmatter의 title 혹은 파일명 등 체크)
  const files = fs.readdirSync(postsDir);
  let alreadyExists = false;
  for (const file of files) {
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
      if (content.includes(`title: "${targetName}"`) || content.includes(`title: ${targetName}`)) {
        alreadyExists = true;
        break;
      }
    }
  }

  if (alreadyExists) {
    console.log("이미 작성된 글입니다.");
    return;
  }

  // 2단계. Gemini AI로 블로그 글 생성
  const today = new Date().toISOString().split('T')[0];
  const prompt = `아래 공공서비스 정보를 바탕으로 블로그 글을 작성해줘.

정보: ${JSON.stringify(lastItem, null, 2)}

아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:
---
title: (친근하고 흥미로운 제목)
date: ${today}
summary: (한 줄 요약)
category: 정보
tags: [태그1, 태그2, 태그3]
sourceLink: ${lastItem.link || ""}
---

(본문: 800자 이상, 친근한 블로그 톤, 추천 이유 3가지 포함, 신청 방법 안내)

FILENAME: ${today}-keyword 형식으로 파일명도 출력해줘. 키워드는 영문으로. 마지막 줄에 위치시켜줘.`;

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const result = await response.json();
    let aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // 3단계. 파일 저장
    // FILENAME 추출
    const filenameMatch = aiResponse.match(/FILENAME:\s*([^\n\r]+)/i);
    let filename = `${today}-post.md`;
    if (filenameMatch) {
      filename = filenameMatch[1].trim();
      if (!filename.endsWith('.md')) filename += '.md';
      // 응답 본문에서 FILENAME 줄 제거
      aiResponse = aiResponse.split('\n').filter(line => !line.toUpperCase().includes('FILENAME:')).join('\n').trim();
    }

    // 마크다운 코드 블록 제거 (혹시 있다면)
    aiResponse = aiResponse.replace(/```markdown/g, '').replace(/```/g, '').trim();

    const finalPath = path.join(postsDir, filename);
    fs.writeFileSync(finalPath, aiResponse, 'utf8');
    console.log(`블로그 글 생성 완료: ${filename}`);

  } catch (error) {
    console.error("블로그 생성 중 오류 발생:", error);
  }
}

generateBlogPost();
