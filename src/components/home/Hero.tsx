import React from "react";
import Link from "next/link";
import { navigation } from "@/data/navigation";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 mix-blend-multiply" />
        <div className="absolute -top-[30%] -left-[10%] h-[150%] w-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold leading-6 text-blue-400 ring-1 ring-inset ring-blue-400/20 mb-6 bg-blue-400/5">
            지금 가장 핫한 로컬 정보 🌊
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-6">
            부산의 축제, 혜택, 맛집, 핫플, 데이트 코스를 <br className="hidden sm:block" /> 한눈에!
          </h1>
          <p className="text-lg leading-8 text-slate-300 mb-10 max-w-lg">
            지역 현지인이 전하는 진짜 부산 이야기와 숨겨진 보석 같은 명소들, 놓칠 수 없는 지원 혜택까지 모두 담았습니다.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              href="/festivals"
              className="rounded-xl bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all active:scale-95"
            >
              축제 보러가기 →
            </Link>
            <Link
              href="/blog"
              className="rounded-xl bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all active:scale-95"
            >
              추천 블로그 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
