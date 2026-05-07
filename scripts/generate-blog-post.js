const fs = require("fs");
const path = require("path");

function escapeYamlString(value) {
  return String(value ?? "").replace(/"/g, '\\"');
}

function toEventImagePath(value) {
  if (!value) {
    return "";
  }

  return String(value).trim();
}

async function generateBlogPost() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error("환경변수 GEMINI_API_KEY가 없습니다.");
    return;
  }

  const postsDir = path.join(__dirname, "../src/content/posts");
  const dataFilePath = path.join(__dirname, "../public/data/local-info.json");

  if (!fs.existsSync(dataFilePath)) {
    console.log("데이터 파일이 없습니다.");
    return;
  }

  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  if (data.length === 0) {
    console.log("데이터가 없습니다.");
    return;
  }

  const lastItem = data[data.length - 1];
  const targetName = lastItem.name;

  const files = fs.readdirSync(postsDir);
  let alreadyExists = false;
  for (const file of files) {
    if (!file.endsWith(".md")) {
      continue;
    }

    const content = fs.readFileSync(path.join(postsDir, file), "utf8");
    if (content.includes(`title: "${targetName}"`) || content.includes(`title: ${targetName}`)) {
      alreadyExists = true;
      break;
    }
  }

  if (alreadyExists) {
    console.log("이미 작성된 글입니다.");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const startDate = lastItem.startDate || lastItem.date || today;
  const endDate = lastItem.endDate || lastItem.date || today;
  const location = lastItem.location || "";
  const image = toEventImagePath(lastItem.image || "");
  const isFree = typeof lastItem.isFree === "boolean" ? lastItem.isFree : true;

  const prompt = `아래 공공서비스 또는 행사 정보를 바탕으로 블로그 글을 작성해줘.

입력 데이터:
${JSON.stringify(lastItem, null, 2)}

반드시 아래 마크다운 형식만 출력해줘. 설명문이나 코드펜스는 넣지 마.
---
title: "(매력적인 제목)"
date: ${today}
summary: "(한 줄 요약)"
category: "정보"
tags: ["태그1", "태그2", "태그3"]
sourceLink: "${escapeYamlString(lastItem.link || "")}"
startDate: "${escapeYamlString(startDate)}"
endDate: "${escapeYamlString(endDate)}"
location: "${escapeYamlString(location)}"
image: "${escapeYamlString(image)}"
isFree: ${isFree}
---

(본문은 800자 이상으로 작성)

추가 규칙:
- 제목은 그대로 frontmatter의 title에 넣어.
- tags는 반드시 3개 이상 넣어. 비워두지 마.
- 시작일/종료일/위치/이미지/무료 여부는 반드시 frontmatter에 채워.
- 이벤트성 글이 아니어도 입력값이 있으면 그대로 유지해.
- 마지막 줄에는 반드시 FILENAME: ${today}-keyword 형식으로 파일명 후보를 적어.
`;

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const result = await response.json();
    let aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const filenameMatch = aiResponse.match(/FILENAME:\s*([^\n\r]+)/i);
    let filename = `${today}-post.md`;
    if (filenameMatch) {
      filename = filenameMatch[1].trim();
      if (!filename.endsWith(".md")) {
        filename += ".md";
      }

      aiResponse = aiResponse
        .split("\n")
        .filter((line) => !line.toUpperCase().includes("FILENAME:"))
        .join("\n")
        .trim();
    }

    aiResponse = aiResponse.replace(/```markdown/g, "").replace(/```/g, "").trim();

    const finalPath = path.join(postsDir, filename);
    fs.writeFileSync(finalPath, aiResponse, "utf8");
    console.log(`블로그 글 생성 완료: ${filename}`);
  } catch (error) {
    console.error("블로그 생성 중 오류 발생:", error);
  }
}

generateBlogPost();
