import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { navigation } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚓️</span>
              <span className="text-xl font-bold text-slate-900">{siteConfig.name}</span>
            </Link>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              {siteConfig.description}
              <br />
              <span className="mt-4 block font-medium text-slate-400">
                일부 정보는 공공데이터 및 수동 큐레이션 기반
              </span>
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">메뉴</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support/Other */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">안내</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">개인정보처리방침</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">이용약관</Link>
              </li>
              <li>
                데이터 문의: <a href="mailto:buzasun@naver.com" className="hover:text-blue-600 transition-colors">buzasun@naver.com</a>
              </li>
              <li>공공데이터활용지원</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <p>데이터 출처: 공공데이터포털 (data.go.kr)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
