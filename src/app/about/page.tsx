import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `사이트 소개 | ${siteConfig.name}`,
  description: `${siteConfig.name} 사이트의 운영 목적과 데이터 출처, 콘텐츠 생성 방식을 소개합니다.`,
};

export default function AboutPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4">
          소개
        </h1>
        <p className="text-lg text-slate-600 font-medium">
          {siteConfig.name} 사이트를 소개합니다.
        </p>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteConfig.name,
            "provider": {
              "@type": "GovernmentOrganization",
              "name": "부산광역시"
            }
          })}
        </script>
      </header>

      <div className="space-y-12">
        {/* 운영 목적 */}
        <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-blue-600">🎯</span> 운영 목적
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            본 사이트는 부산 주민들이 지역의 다양한 **행사, 축제, 지원금, 그리고 각종 혜택 정보**를 보다 쉽고 빠르게 접할 수 있도록 돕기 위해 운영되고 있습니다.
          </p>
          <p className="text-slate-600 leading-relaxed">
            복잡한 공공기관의 공지사항 중에서 우리 생활에 정말 필요한 정보만을 선별하여 친근한 어조로 전달함으로써, 시민들의 삶의 질 향상에 기여하고자 합니다.
          </p>
        </section>

        {/* 데이터 출처 */}
        <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-blue-600">📊</span> 데이터 출처
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            저희가 제공하는 모든 정보는 {siteConfig.name}의 공공데이터를 활용하며, 대한민국 정부의 **공공데이터포털(data.go.kr)**에서 제공하는 공식 API를 기반으로 합니다.
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>행정안전부_공공서비스 목록 조회 서비스</li>
            <li>부산 관련 공공데이터</li>
          </ul>
        </section>

        {/* 콘텐츠 생성 방식 */}
        <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-blue-600">🤖</span> 콘텐츠 생성 방식 (AI 활용)
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            본 사이트는 정보의 신속한 전달을 위해 **최신 생성형 AI 기술(Gemini)**을 활용하여 콘텐츠를 작성합니다. 
          </p>
          <p className="text-slate-600 leading-relaxed">
            수집된 방대한 양의 공공데이터를 AI가 분석하고, 이를 시민들이 이해하기 쉬운 블로그 형태의 글로 변환하여 매일 자동으로 업데이트하고 있습니다. 모든 자동 생성 콘텐츠는 지속적으로 품질을 모니터링하고 있습니다.
          </p>
        </section>

        {/* 안내 사항 */}
        <section className="bg-blue-50 p-8 md:p-12 rounded-[2.5rem]">
          <h2 className="text-xl font-bold text-slate-900 mb-4">⚠️ 안내 사항</h2>
          <p className="text-slate-600 text-sm">부산의 더 많은 꿀팁을 놓치지 마세요!</p>
          <p className="text-slate-600 text-sm leading-relaxed">
            본 사이트에서 제공하는 정보는 데이터 제공 시점에 따라 실제와 차이가 있을 수 있습니다. 중요한 신청이나 참여 전에는 반드시 게시글 하단의 **원문 링크(공식 홈페이지)**를 통해 정확한 내용을 재확인하시기 바랍니다.
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link href="/" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all">
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
