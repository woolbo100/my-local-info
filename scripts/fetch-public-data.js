const fs = require('fs');
const path = require('path');

async function fetchPublicData() {
  const PUBLIC_DATA_API_KEY = process.env.PUBLIC_DATA_API_KEY;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!PUBLIC_DATA_API_KEY || !GEMINI_API_KEY) {
    console.error("환경변수 PUBLIC_DATA_API_KEY 또는 GEMINI_API_KEY가 없습니다.");
    return;
  }

  const dataFilePath = path.join(__dirname, '../public/data/local-info.json');
  
  // 1. 기존 데이터 읽기
  let existingData = [];
  if (fs.existsSync(dataFilePath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch (e) {
      console.error("기존 데이터 파일을 읽는 중 오류 발생:", e);
      existingData = [];
    }
  } else {
    // 디렉토리가 없으면 생성
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  try {
    // 1단계. 공공데이터포털 API에서 데이터 가져오기
    const url = `https://api.odcloud.kr/api/gov24/v3/serviceList?page=1&perPage=20&serviceKey=${PUBLIC_DATA_API_KEY}`;
    console.log("공공데이터 API 호출 중...");
    const response = await fetch(url);
    const result = await response.json();

    if (!result.data || !Array.isArray(result.data)) {
      console.error("API 응답 데이터가 올바르지 않습니다.");
      return;
    }

    // 2. 필터링
    let filtered = result.data.filter(item => 
      (item.svcNm || "").includes("부산") || 
      (item.svcPurposeSummary || "").includes("부산") || 
      (item.supportTarget || "").includes("부산") || 
      (item.mgrOrgNm || "").includes("부산")
    );

    if (filtered.length === 0) {
      filtered = result.data.filter(item => 
        (item.svcNm || "").includes("경기") || 
        (item.svcPurposeSummary || "").includes("경기") || 
        (item.supportTarget || "").includes("경기") || 
        (item.mgrOrgNm || "").includes("경기")
      );
    }

    if (filtered.length === 0) {
      filtered = result.data;
    }

    // 2단계. 기존 데이터와 비교 (name 기준)
    const existingNames = new Set(existingData.map(item => item.name));
    const newDataItems = filtered.filter(item => !existingNames.has(item.svcNm));

    if (newDataItems.length === 0) {
      console.log("새로운 데이터가 없습니다.");
      return;
    }

    // 3단계. Gemini AI로 새 항목 1개만 가공
    const targetItem = newDataItems[0];
    console.log(`새로운 항목 가공 중: ${targetItem.svcNm}`);

    const prompt = `아래 공공데이터 1건을 분석해서 JSON 객체로 변환해줘. 형식:
{id: 숫자, name: 서비스명, category: '행사' 또는 '혜택', startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', location: 장소 또는 기관명, target: 지원대상, summary: 한줄요약, link: 상세URL}
category는 내용을 보고 행사/축제면 '행사', 지원금/서비스면 '혜택'으로 판단해.
startDate가 없으면 오늘 날짜, endDate가 없으면 '상시'로 넣어.
반드시 JSON 객체만 출력해. 다른 텍스트 없이.

데이터:
${JSON.stringify(targetItem, null, 2)}`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const geminiResult = await geminiResponse.json();
    let aiText = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // JSON 추출 (마크다운 코드블록 제거)
    aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let processedItem;
    try {
      processedItem = JSON.parse(aiText);
    } catch (e) {
      console.error("AI 응답을 JSON으로 파싱하는 중 오류 발생:", e);
      console.error("AI 응답 내용:", aiText);
      return;
    }

    // 4단계. 기존 데이터에 추가
    // ID 생성 (기존 최대 ID + 1)
    const maxId = existingData.reduce((max, item) => Math.max(max, item.id || 0), 0);
    processedItem.id = maxId + 1;

    existingData.push(processedItem);
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log(`추가 완료: ${processedItem.name}`);

  } catch (error) {
    console.error("스크립트 실행 중 오류 발생:", error);
    // 기존 local-info.json 유지 (아무것도 하지 않음)
  }
}

fetchPublicData();
