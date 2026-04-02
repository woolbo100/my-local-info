import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostData, getSortedPostsData } from "@/lib/posts";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);
  if (!post) return { title: "포스트를 찾을 수 없습니다." };

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          블로그 목록으로 돌아가기
        </Link>
      </div>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-4 py-1.5 text-xs font-bold tracking-wide uppercase text-blue-700 bg-blue-100/50 rounded-full">
            {post.category}
          </span>
          <time className="text-sm font-medium text-slate-400" dateTime={post.date}>
            {post.date}
          </time>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-8">
          {post.title}
        </h1>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <article className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-black prose-a:text-blue-600 prose-img:rounded-3xl prose-pre:bg-slate-900 prose-pre:p-6 prose-pre:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content || ""}
          </ReactMarkdown>
        </article>
      </div>
      
      {/* Footer Info */}
      <footer className="mt-16 pt-8 border-t border-slate-100">
        <div className="bg-blue-50 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900 mb-1">유익한 정보였나요?</h3>
            <p className="text-slate-600 text-sm">부산의 더 많은 꿀팁을 놓치지 마세요!</p>
          </div>
          <Link href="/" className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all">
            메인 페이지 구경하기
          </Link>
        </div>
      </footer>
    </div>
  );
}
