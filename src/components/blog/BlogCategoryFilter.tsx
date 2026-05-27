"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import InfoCard from "@/components/cards/InfoCard";
import type { ContentPost } from "@/lib/content";
import {
  BLOG_CATEGORY_LABELS,
  getBlogCategoryFromQuery,
  getBlogCategoryQueryValue,
} from "@/lib/blog-categories";

interface BlogCategoryFilterProps {
  posts: ContentPost[];
}

function getDisplayDate(post: ContentPost) {
  if (post.startDate && post.endDate) {
    return `${post.startDate} ~ ${post.endDate}`;
  }

  return post.date;
}

export default function BlogCategoryFilter({
  posts,
}: BlogCategoryFilterProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = getBlogCategoryFromQuery(searchParams.get("tab") ?? undefined);

  const filteredPosts = useMemo(() => {
    if (!activeCategory) {
      return posts;
    }

    return posts.filter((post) => post.blogCategory === activeCategory);
  }, [activeCategory, posts]);

  return (
    <>
      <nav aria-label="블로그 카테고리 필터" className="mb-8">
        <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap">
          {BLOG_CATEGORY_LABELS.map((label) => {
            const isActive =
              label === "전체" ? activeCategory === null : activeCategory === label;

            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (label === "전체") {
                    router.push(pathname);
                    return;
                  }

                  router.push(`${pathname}?tab=${getBlogCategoryQueryValue(label)}`);
                }}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]"
                    : "border-slate-200 bg-white text-slate-800 shadow-[0_6px_18px_rgba(15,23,42,0.06)] hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPosts.map((post) => (
          <InfoCard
            key={post.route}
            title={post.title}
            description={post.excerpt}
            date={getDisplayDate(post)}
            location={post.location}
            category={post.blogCategory}
            tags={post.tags}
            image={post.thumbnail}
            href={post.route}
            type="blog"
          />
        ))}
      </div>
    </>
  );
}
