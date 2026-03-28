import React from "react";
import Link from "next/link";

const categories = [
  { title: "축제/행사", href: "/festivals", emoji: "🎉", color: "bg-red-50 text-red-600" },
  { title: "지원/혜택", href: "/benefits", emoji: "💰", color: "bg-green-50 text-green-600" },
  { title: "부산 맛집", href: "/food", emoji: "🍜", color: "bg-orange-50 text-orange-600" },
  { title: "핫플레이스", href: "/hotplaces", emoji: "📸", color: "bg-blue-50 text-blue-600" },
  { title: "데이트 코스", href: "/date-courses", emoji: "👩‍❤️‍👨", color: "bg-purple-50 text-purple-600" },
  { title: "로컬 블로그", href: "/blog", emoji: "✍️", color: "bg-amber-50 text-amber-600" },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-wider">
          카테고리 바로가기
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-100 transition-all hover:shadow-md hover:border-transparent active:scale-95 ${cat.color}`}
            >
              <span className="text-3xl mb-3">{cat.emoji}</span>
              <span className="font-bold text-sm text-slate-700">{cat.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
