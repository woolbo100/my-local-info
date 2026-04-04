import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import DarkOceanShell from "@/components/layout/DarkOceanShell";

export const metadata = {
  title: `소개 | ${siteConfig.name}`,
  description: `${siteConfig.name} 사이트의 운영 목적, 데이터 출처, 콘텐츠 제작 방식을 소개합니다.`,
};

export default function AboutPage() {
  return (
    <DarkOceanShell className="max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <header className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          소개
        </h1>
        <p className="text-lg font-medium text-slate-200">
          부산나우(Busan Now) 사이트를 소개합니다.
        </p>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            provider: {
              "@type": "GovernmentOrganization",
              name: "부산시",
            },
          })}
        </script>
      </header>

      <div className="space-y-12">
        <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
            <span className="text-blue-600">🎯</span> 운영 목적
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            본 사이트는 부산 시민과 방문객이 지역의 다양한 축제, 행사, 지원·혜택,
            맛집, 핫플레이스, 데이트 코스 정보를 보다 쉽고 빠르게 확인할 수
            있도록 운영되고 있습니다.
          </p>
          <p className="leading-relaxed text-slate-600">
            흩어져 있는 공공 정보와 로컬 콘텐츠를 정리해 친근하고 읽기 쉬운
            형태로 전달함으로써, 부산의 일상과 여행에 실제로 도움이 되는 정보
            플랫폼을 지향합니다.
          </p>
        </section>

        <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
            <span className="text-blue-600">📌</span> 데이터 출처
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            사이트에서 제공하는 정보는 공공데이터포털(data.go.kr), 지방자치단체 및
            공공기관의 공식 공지, 지역 기반 정보 등을 바탕으로 정리됩니다.
          </p>
          <ul className="list-inside list-disc space-y-2 text-slate-600">
            <li>공공데이터포털(data.go.kr) 제공 데이터</li>
            <li>부산시 및 유관 기관의 공식 안내 자료</li>
            <li>지역 행사, 축제, 생활 정보 관련 공개 자료</li>
          </ul>
        </section>

        <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
            <span className="text-blue-600">🧭</span> 콘텐츠 제작 방식
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            부산나우의 콘텐츠는 파일 기반 구조로 관리되며, 축제·행사·혜택·맛집
            등의 주제를 사용자가 빠르게 이해할 수 있도록 정리된 형태로 제공합니다.
          </p>
          <p className="leading-relaxed text-slate-600">
            정보는 지속적으로 업데이트되며, 각 글은 날짜와 출처를 바탕으로
            검토하여 가독성 높은 로컬 콘텐츠로 구성됩니다.
          </p>
        </section>

        <section className="rounded-[2.5rem] bg-blue-50 p-8 md:p-12">
          <h2 className="mb-4 text-xl font-bold text-slate-900">안내 사항</h2>
          <p className="mb-3 text-sm text-slate-600">
            실제 방문이나 신청 전에는 반드시 최신 정보를 함께 확인해주세요.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            사이트에 제공되는 정보는 수집 시점에 따라 실제와 차이가 있을 수
            있습니다. 중요한 일정, 참여, 신청 정보는 각 게시글 하단 또는 원문
            링크의 공식 안내 페이지를 통해 최종 확인하시길 권장합니다.
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl"
        >
          메인으로 돌아가기
        </Link>
      </div>
    </DarkOceanShell>
  );
}
