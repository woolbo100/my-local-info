import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
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
        <div className="absolute -left-[10%] -top-[30%] h-[150%] w-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.14),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <div className="mb-7 inline-flex items-center rounded-full bg-blue-300/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-100 ring-1 ring-inset ring-blue-200/25 backdrop-blur-sm">
            부산 로컬 정보 플랫폼
          </div>
          <h1 className="max-w-4xl text-4xl font-black tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem] lg:leading-[1.24]">
            부산의 축제·행사·혜택·맛집
            <br className="hidden lg:block" />
            <span className="lg:block">핫플레이스·데이트 코스를</span>
            <span className="lg:block">한눈에</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200">
            부산에서 지금 꼭 알아야 할 축제, 맛집, 데이트 코스를
            한눈에 확인할수 있는 부산 로컬 콘텐츠 허브입니다.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href="/festivals"
              className="rounded-xl bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-500 active:scale-95"
            >
              축제 보러가기
            </Link>
            <Link
              href="/blog"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
            >
              블로그 콘텐츠 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
