import React from "react";
import Image from "next/image";
import Link from "next/link";

interface InfoCardProps {
  title: string;
  description: string;
  category?: string;
  location?: string;
  date?: string;
  tags?: string[];
  image?: string;
  href: string;
  type?: "benefit" | "place" | "festival" | "blog";
}

export default function InfoCard({
  title,
  description,
  category,
  location,
  date,
  tags,
  image,
  href,
  type = "place",
}: InfoCardProps) {
  // 간단한 카테고리별 컬러 매핑
  const categoryColors: Record<string, string> = {
    festival: "bg-red-50 text-red-700 border-red-100",
    benefit: "bg-green-50 text-green-700 border-green-100",
    place: "bg-blue-50 text-blue-700 border-blue-100",
    blog: "bg-amber-50 text-amber-700 border-amber-100",
  };

  return (
    <Link href={href} className="group block h-full">
      <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full active:scale-[0.98]">
        {/* Image / Placeholder */}
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
          {image ? (
            <div className="relative w-full h-full">
               <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                  <span className="text-slate-400 text-xs">No Image</span>
               </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-slate-50 to-slate-200 group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{type} Info</span>
            </div>
          )}
          {category && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${categoryColors[type] || categoryColors.place}`}>
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
            {title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>

          <div className="mt-auto space-y-2">
            {date && (
              <div className="flex items-center text-xs text-slate-500">
                <span className="mr-1.5">📅</span>
                {date}
              </div>
            )}
            {location && (
              <div className="flex items-center text-xs text-slate-500">
                <span className="mr-1.5">📍</span>
                {location}
              </div>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Added: 자세히 보기 버튼 */}
            <div className="pt-4 mt-2 border-t border-slate-50 flex justify-end">
               <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center">
                  자세히 보기
                  <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
               </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
