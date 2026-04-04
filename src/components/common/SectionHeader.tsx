import React from "react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  description?: string;
  viewAllLink?: string;
  emoji?: string;
  tone?: "default" | "light";
}

export default function SectionHeader({
  title,
  description,
  viewAllLink,
  emoji,
  tone = "default",
}: SectionHeaderProps) {
  const titleClass = tone === "light" ? "text-white" : "text-[#123b6a]";
  const descriptionClass =
    tone === "light" ? "text-slate-200" : "text-[#5b6b7f]";
  const buttonClass =
    tone === "light"
      ? "bg-white/12 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] hover:bg-white/18 hover:shadow-[0_14px_28px_rgba(15,23,42,0.24)]"
      : "bg-white/85 text-blue-600 shadow-[0_8px_18px_rgba(37,99,235,0.12)] hover:bg-white hover:text-blue-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.18)]";

  return (
    <div className="mb-8 flex items-end justify-between gap-6 group">
      <div>
        <div className="mb-2 flex items-center gap-2">
          {emoji && <span className="text-2xl">{emoji}</span>}
          <h2 className={`text-2xl font-bold ${titleClass}`}>{title}</h2>
        </div>
        {description && <p className={`text-sm ${descriptionClass}`}>{description}</p>}
      </div>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 flex items-center ${buttonClass}`}
        >
          더보기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
