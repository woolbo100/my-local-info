import React from "react";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

// 정적 배포를 위해 모든 가능한 경로(slug)를 미리 생성합니다.
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen border-none text-slate-900 shadow-none">
       {/* Simple Article Header */}
       <div className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
             <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">{post.category}</span>
                <span className="text-slate-400 text-sm">|</span>
                <span className="text-slate-500 text-sm">{post.date}</span>
             </div>
             <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                {post.title}
             </h1>
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200" />
                <span className="text-sm font-semibold text-slate-700">{post.author}</span>
             </div>
          </div>
       </div>

       {/* Article Body */}
       <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
             <p className="text-lg text-slate-600 font-medium italic border-l-4 border-slate-200 pl-6">
                {post.description}
             </p>
             <div className="whitespace-pre-wrap">
                {post.content}
                {"\n"}
                {"\n"}
                여기에 실제 블로그 본문 내용이 풍부하게 들어갈 예정입니다. 현재는 샘플로 동작하며, 나중에 CMS나 마크다운 파일을 연동하면 자동으로 렌더링되게 구현할 수 있습니다.
             </div>
             
             <div className="pt-12 border-t border-slate-100 flex flex-wrap gap-2">
                {post.tags?.map(tag => (
                   <span key={tag} className="text-xs px-3 py-1.5 bg-slate-50 text-slate-500 rounded-full">#{tag}</span>
                ))}
             </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100">
             <Link href="/blog" className="text-blue-600 font-bold hover:underline">
                ← 전체 블로그 목록으로 돌아가기
             </Link>
          </div>
       </article>
    </div>
  );
}
