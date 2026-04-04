import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { navigation } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <span className="text-2xl">⚓</span>
              <span className="text-xl font-bold text-slate-900">{siteConfig.name}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-900">
              메뉴
            </h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-900">
              안내
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-blue-600">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-blue-600">
                  이용약관
                </Link>
              </li>
              <li>
                제휴 문의:{" "}
                <a
                  href="mailto:buzasun@naver.com"
                  className="transition-colors hover:text-blue-600"
                >
                  buzasun@naver.com
                </a>
              </li>
              <li>공공데이터 및 로컬 큐레이션 기반</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <p>데이터 출처: 공공데이터포털(data.go.kr)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
