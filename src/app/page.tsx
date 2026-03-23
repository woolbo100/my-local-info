import Link from "next/link";
import fs from "fs";
import path from "path";

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

export default function Home() {
  // 샘플 데이터 읽기
  const filePath = path.join(process.cwd(), "public", "data", "local-info.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const data: LocalInfo[] = JSON.parse(fileData);

  // 카테고리별로 데이터 분류
  const events = data.filter((item) => item.category === "행사");
  const benefits = data.filter((item) => item.category === "혜택");

  return (
    <div className="min-h-screen bg-orange-50 text-slate-800 font-sans">
      {/* 1. 상단 헤더 */}
      <header className="bg-white border-b border-orange-100 py-8 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            🍊 성남시 생활 정보
          </h1>
          <p className="text-amber-700 opacity-80">
            우리 동네의 따끈따끈한 소식을 전해드립니다
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4 space-y-12">
        {/* 2. 이번 달 행사/축제 */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🎉</span>
            <h2 className="text-2xl font-bold text-amber-900">이번 달 행사/축제</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link key={event.id} href={`/info/${event.id}`}>
                <article
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-orange-100 h-full cursor-pointer"
                >
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-3">
                    {event.category}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">
                    {event.name}
                  </h3>
                  <div className="space-y-1 text-sm text-slate-600 mb-4">
                    <p>📅 {event.startDate} ~ {event.endDate}</p>
                    <p>📍 {event.location}</p>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    {event.summary}
                  </p>
                  <span className="inline-block text-amber-600 font-medium text-sm hover:underline">
                    자세히 보기 →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. 지원금/혜택 정보 */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">💰</span>
            <h2 className="text-2xl font-bold text-amber-900">지원금/혜택 정보</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <Link key={benefit.id} href={`/info/${benefit.id}`}>
                <article
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-400 h-full cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {benefit.category}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">
                    {benefit.name}
                  </h3>
                  <p className="text-sm text-amber-800 font-medium mb-3">
                    대상: {benefit.target}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    {benefit.summary}
                  </p>
                  <span className="inline-block text-amber-600 font-medium text-sm hover:underline">
                    신청 방법 확인하기 →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 4. 하단 푸터 */}
      <footer className="bg-slate-100 py-12 px-4 mt-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center text-sm text-slate-500 space-y-2">
          <p>데이터 출처: 공공데이터포털 (data.go.kr)</p>
          <p>마지막 업데이트: 2024년 3월 23일</p>
          <p className="pt-4 opacity-70">© 2024 성남시 생활 정보. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
