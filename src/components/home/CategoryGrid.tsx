import React from "react";
import Link from "next/link";
import { CATEGORY_ORDER, getCategoryConfig } from "@/lib/content-config";

const colorMap: Record<string, string> = {
  festivals: "bg-red-50 text-red-600",
  events: "bg-pink-50 text-pink-600",
  benefits: "bg-green-50 text-green-600",
  food: "bg-orange-50 text-orange-600",
  hotplaces: "bg-blue-50 text-blue-600",
  dates: "bg-violet-50 text-violet-600",
  blog: "bg-amber-50 text-amber-600",
};

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-wider">
          카테고리 바로가기
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORY_ORDER.map((category) => {
            const config = getCategoryConfig(category);

            return (
              <Link
                key={config.route}
                href={`/${config.route}`}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-100 transition-all hover:shadow-md hover:border-transparent active:scale-95 ${colorMap[config.route]}`}
              >
                <span className="text-3xl mb-3">{config.emoji}</span>
                <span className="font-bold text-sm text-slate-700">{config.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
