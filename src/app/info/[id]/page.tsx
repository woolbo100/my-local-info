import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

interface LocalInfo {
  id: number;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  target: string;
  summary: string;
  link: string;
}

// 1. 모든 상세 페이지의 경로를 미리 생성합니다 (정적 배포용)
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "data", "local-info.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const data: LocalInfo[] = JSON.parse(fileData);

  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

// 2. 상세 페이지 컴포넌트
export default async function InfoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // 데이터 읽기
  const filePath = path.join(process.cwd(), "public", "data", "local-info.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const data: LocalInfo[] = JSON.parse(fileData);

  // 해당 ID의 데이터 찾기
  const info = data.find((item) => item.id.toString() === id);

  // 데이터가 없으면 404 페이지 표시
  if (!info) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-orange-50 text-slate-800 font-sans">
      <header className="bg-white border-b border-orange-100 py-6 px-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-amber-600 font-medium hover:text-amber-700 transition-colors flex items-center gap-1 text-sm"
          >
            ← 목록으로 돌아가기
          </Link>
          <h1 className="text-xl font-bold text-amber-900 hidden sm:block">
            성남시 생활 정보
          </h1>
          <div className="w-[100px] hidden sm:block"></div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-10 px-4">
        <article className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-orange-100">
          <div className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-bold mb-6">
            {info.category}
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
            {info.name}
          </h2>

          <div className="grid gap-6 py-8 border-y border-orange-100 mb-8 text-lg">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-bold text-amber-900 w-24 shrink-0">📅 기간</span>
              <span className="text-slate-700">{info.startDate} ~ {info.endDate}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-bold text-amber-900 w-24 shrink-0">📍 장소</span>
              <span className="text-slate-700">{info.location}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-bold text-amber-900 w-24 shrink-0">👥 대상</span>
              <span className="text-slate-700">{info.target}</span>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-4">상세 설명</h3>
            <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
              {info.summary}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-2xl text-center shadow-lg shadow-amber-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              자세히 보기 →
            </a>
            <Link
              href="/"
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-8 rounded-2xl text-center transition-all"
            >
              목록으로
            </Link>
          </div>
        </article>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2024 성남시 생활 정보. All rights reserved.</p>
      </footer>
    </div>
  );
}
