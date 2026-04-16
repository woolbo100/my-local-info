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
  const normalizedCategory = (category || "").trim();

  const categoryColorsByLabel: Record<string, string> = {
    "축제/행사": "border-red-100 bg-red-50/95 text-red-700",
    "지원/혜택": "border-emerald-100 bg-emerald-50/95 text-emerald-700",
    "부산 맛집": "border-amber-100 bg-amber-50/95 text-amber-700",
    핫플레이스: "border-blue-100 bg-blue-50/95 text-blue-700",
    "데이트 코스": "border-pink-100 bg-pink-50/95 text-pink-700",
    블로그: "border-slate-200 bg-slate-100/95 text-slate-700",
  };

  const categoryColorsByType: Record<string, string> = {
    festival: "border-red-100 bg-red-50/95 text-red-700",
    benefit: "border-emerald-100 bg-emerald-50/95 text-emerald-700",
    place: "border-blue-100 bg-blue-50/95 text-blue-700",
    blog: "border-slate-200 bg-slate-100/95 text-slate-700",
  };

  const badgeClass =
    categoryColorsByLabel[normalizedCategory] ||
    categoryColorsByType[type] ||
    categoryColorsByType.place;

  return (
    <Link href={href} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-white/80 bg-white/96 shadow-[0_14px_34px_rgba(15,23,42,0.1)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(15,23,42,0.16)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[20px] bg-slate-100">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-2 bg-gradient-to-br from-sky-50 to-blue-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-sky-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-[10px] font-medium uppercase tracking-wider text-sky-500">
                {type} Info
              </span>
            </div>
          )}
          {category && (
            <span
              className={`absolute left-3 top-3 rounded-xl border bg-white/90 px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm ${badgeClass}`}
            >
              {category}
            </span>
          )}
        </div>

        <div className="flex flex-grow flex-col p-5">
          <h3 className="mb-2 line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {description}
          </p>

          <div className="space-y-2">
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
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex justify-end border-t border-slate-100 pt-4">
              <span className="flex items-center text-xs font-bold text-blue-600 transition-all group-hover:translate-x-1 group-hover:text-blue-700">
                자세히 보기
                <svg
                  className="ml-1 h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
