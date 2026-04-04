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
  const categoryColors: Record<string, string> = {
    festival: "bg-red-50/95 text-red-700 border-red-100",
    benefit: "bg-emerald-50/95 text-emerald-700 border-emerald-100",
    place: "bg-blue-50/95 text-blue-700 border-blue-100",
    blog: "bg-amber-50/95 text-amber-700 border-amber-100",
  };

  return (
    <Link href={href} className="group block h-full">
      <article className="bg-white/96 rounded-[20px] border border-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col h-full backdrop-blur-sm">
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden rounded-t-[20px]">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-sky-50 to-blue-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-[10px] text-sky-500 font-medium uppercase tracking-wider">{type} Info</span>
            </div>
          )}
          {category && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-xl text-[11px] font-bold border backdrop-blur-sm bg-white/90 ${categoryColors[type] || categoryColors.place}`}>
              {category}
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 line-clamp-1">
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
                {tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end">
              <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all flex items-center">
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
