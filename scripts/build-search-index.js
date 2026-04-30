const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const LOCAL_INFO_FILE = path.join(__dirname, '../public/data/local-info.json');
const OUTPUT_DIR = path.join(__dirname, '../public/data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'search-index.json');

function stripMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/[#*`~_]/g, '') // 마크다운 기호 제거
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 링크 텍스트만 유지
    .replace(/\r?\n|\r/g, ' ') // 줄바꿈을 공백으로 변경
    .replace(/\s+/g, ' ') // 연속된 공백 제거
    .trim();
}

const searchIndex = [];

// 1. public/data/local-info.json 항목 추가
if (fs.existsSync(LOCAL_INFO_FILE)) {
  try {
    const localInfo = JSON.parse(fs.readFileSync(LOCAL_INFO_FILE, 'utf-8'));
    localInfo.forEach(item => {
      searchIndex.push({
        type: 'info',
        id: item.id,
        title: item.name,
        category: item.category,
        summary: item.summary,
        content: stripMarkdown(`${item.target || ''} ${item.location || ''}`),
        url: `/benefits` // 공공데이터 상세 페이지가 따로 없다면 목록 페이지로 연결
      });
    });
  } catch (err) {
    console.error('Error parsing local-info.json:', err);
  }
}

// 2. src/content/posts/*.md 파일 추가
if (fs.existsSync(POSTS_DIR)) {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    try {
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      // 파일명에서 날짜 부분 제거하여 슬러그 생성 (예: 2024-01-01-title.md -> title)
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '');
      const category = data.category || 'blog';

      searchIndex.push({
        type: 'post',
        title: data.title || file,
        category: category,
        summary: data.excerpt || data.summary || '',
        content: stripMarkdown(content.slice(0, 500)),
        url: `/${category}/${slug}`
      });
    } catch (err) {
      console.error(`Error processing post ${file}:`, err);
    }
  });
}

// 결과 저장
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2), 'utf-8');
console.log(`Search index built: ${searchIndex.length} entries`);
