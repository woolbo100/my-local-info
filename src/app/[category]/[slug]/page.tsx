import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { siteConfig } from "@/data/site";
import { buildEventJsonLd, isEventPost } from "@/lib/event-schema";
import {
  getAllPostParams,
  getDisplayDate,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/content";
import {
  getCategoryConfig,
  isCategoryRoute,
  type CategoryRoute,
} from "@/lib/content-config";
import InfoCard from "@/components/cards/InfoCard";
import AdBanner from "@/components/AdBanner";

interface PostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

function toAbsoluteUrl(pathOrUrl?: string) {
  if (!pathOrUrl) {
    return undefined;
  }

  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return `${siteConfig.url}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export async function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategoryRoute(category)) {
    return {};
  }

  const post = getPostBySlug(category, slug);
  if (!post) {
    return {};
  }

  const imageUrl = toAbsoluteUrl(post.thumbnail || post.image);

  return {
    title: `${post.title} | 부산나우`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `${siteConfig.url}/${category}/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/${category}/${slug}`,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  if (!isCategoryRoute(category)) {
    notFound();
  }

  const typedCategory = category as CategoryRoute;
  const config = getCategoryConfig(typedCategory);
  const post = getPostBySlug(typedCategory, slug);
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(typedCategory, slug, 3);
  const eventJsonLd = buildEventJsonLd(post);
  const imageUrl = toAbsoluteUrl(post.thumbnail || post.image);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="mb-12">
        <Link
          href={`/${typedCategory}`}
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {config.label} 목록으로 돌아가기
        </Link>
      </div>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="px-4 py-1.5 text-xs font-bold tracking-wide uppercase text-blue-700 bg-blue-100/50 rounded-full">
            {post.categoryLabel}
          </span>
          <time className="text-sm font-medium text-slate-400" dateTime={post.date}>
            {getDisplayDate(post)}
          </time>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6">
          {post.title}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 mb-10">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </div>

        {(post.location || isEventPost(post)) && (
          <section className="mb-10 rounded-3xl bg-slate-50 border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">콘텐츠 정보</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {post.location && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1">위치</p>
                  <p className="text-slate-700">{post.location}</p>
                </div>
              )}
              {post.startDate && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1">시작일</p>
                  <p className="text-slate-700">{post.startDate}</p>
                </div>
              )}
              {post.endDate && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1">종료일</p>
                  <p className="text-slate-700">{post.endDate}</p>
                </div>
              )}
              {post.isFree !== null && post.isFree !== undefined && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1">이용 요금</p>
                  <p className="text-slate-700">{post.isFree ? "무료" : "유료"}</p>
                </div>
              )}
            </div>
          </section>
        )}

        <article className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-black prose-a:text-blue-600 prose-img:rounded-3xl prose-pre:bg-slate-900 prose-pre:p-6 prose-pre:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ""}</ReactMarkdown>
        </article>
      </div>

      <AdBanner />

      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">{config.emoji}</span>
            <h2 className="text-2xl font-bold text-slate-900">관련 글</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <InfoCard
                key={relatedPost.route}
                title={relatedPost.title}
                description={relatedPost.excerpt}
                date={getDisplayDate(relatedPost)}
                location={relatedPost.location}
                category={relatedPost.categoryLabel}
                tags={relatedPost.tags}
                image={relatedPost.thumbnail}
                href={relatedPost.route}
                type={config.cardType}
              />
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            image: imageUrl ? [imageUrl] : undefined,
            author: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              logo: {
                "@type": "ImageObject",
                url: `${siteConfig.url}/logo.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${siteConfig.url}/${typedCategory}/${slug}`,
            },
          }),
        }}
      />

      {eventJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventJsonLd),
          }}
        />
      )}
    </div>
  );
}
