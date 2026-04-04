import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/busan-gwangan-night.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 blur-[1px]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.58)_0%,rgba(15,23,42,0.8)_45%,rgba(15,23,42,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/18 via-slate-950/10 to-slate-900/35 mix-blend-screen" />
        <div className="absolute -top-[30%] -left-[10%] h-[150%] w-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.14),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <div className="mb-6 inline-flex items-center rounded-full bg-blue-300/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-100 ring-1 ring-inset ring-blue-200/25 backdrop-blur-sm">
            파일 기반 로컬 콘텐츠 운영
          </div>
          <h1 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
            부산의 축제, 행사, 혜택, 맛집,
            <br className="hidden sm:block" /> 핫플레이스와 데이트 코스를 한곳에서
          </h1>
          <p className="mb-10 max-w-lg text-lg leading-8 text-slate-200">
            새 마크다운 파일만 추가하면 홈, 목록, 상세 페이지에 자동 반영되는 부산 로컬 콘텐츠 허브입니다.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              href="/festivals"
              className="rounded-xl bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all active:scale-95"
            >
              축제 보러가기
            </Link>
            <Link
              href="/blog"
              className="rounded-xl bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all active:scale-95"
            >
              블로그 콘텐츠 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
