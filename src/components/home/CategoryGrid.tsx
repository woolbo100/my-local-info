import React from "react";
import Link from "next/link";
import { CATEGORY_ORDER, getCategoryConfig } from "@/lib/content-config";

const colorMap: Record<string, string> = {
  festivals: "bg-rose-50/80 text-rose-600",
  benefits: "bg-emerald-50/80 text-emerald-600",
  food: "bg-orange-50/85 text-orange-600",
  hotplaces: "bg-blue-50/85 text-blue-600",
  dates: "bg-violet-50/85 text-violet-600",
  blog: "bg-amber-50/85 text-amber-600",
};

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white/45 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-[#123b6a] mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-wider">
          카테고리 바로가기
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORY_ORDER.map((category) => {
            const config = getCategoryConfig(category);

            return (
              <Link
                key={config.route}
                href={`/${config.route}`}
                className={`flex flex-col items-center justify-center p-6 rounded-[22px] border border-white/70 bg-white/72 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(15,23,42,0.10)] hover:border-white active:scale-[0.99] ${colorMap[config.route]}`}
              >
                <span className="text-3xl mb-3">{config.emoji}</span>
                <span className="font-bold text-sm text-slate-700 text-center">{config.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
