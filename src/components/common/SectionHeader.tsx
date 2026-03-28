import React from "react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  description?: string;
  viewAllLink?: string;
  emoji?: string;
}

export default function SectionHeader({
  title,
  description,
  viewAllLink,
  emoji,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-8 group">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {emoji && <span className="text-2xl">{emoji}</span>}
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        </div>
        {description && <p className="text-slate-500 text-sm">{description}</p>}
      </div>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center transition-colors px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100"
        >
          더보기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
