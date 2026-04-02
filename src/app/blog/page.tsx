import React from "react";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import SectionHeader from "@/components/common/SectionHeader";

export const metadata = {
  title: "블로그",
  description: "부산의 생생한 축제, 행사 정보와 로컬 팁을 전해드립니다.",
};

export default async function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SectionHeader 
        title="로컬 블로그" 
        description="부산의 최신 소식과 유용한 팁을 확인해 보세요." 
      />

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mt-12">
          <span className="text-4xl mb-4 block">📝</span>
          <p className="text-slate-500 font-medium whitespace-pre-wrap">새로운 소식이 곧 업데이트될 예정입니다.</p>
        </div>
      ) : (
        <div className="mt-12 space-y-12">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="group relative flex flex-col items-start bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                  {post.category}
                </span>
                <time className="text-xs text-slate-400 font-medium" dateTime={post.date}>
                  {post.date}
                </time>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  <span className="absolute inset-0 z-10" />
                  {post.title}
                </Link>
              </h2>

              <p className="text-slate-600 leading-relaxed line-clamp-3 mb-6">
                {post.summary}
              </p>

              <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-slate-50">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] text-slate-400 uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  더 읽어보기
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
