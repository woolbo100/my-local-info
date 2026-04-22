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
import DarkOceanShell from "@/components/layout/DarkOceanShell";

interface PostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

function normalizeImageSource(pathOrUrl?: string) {
  if (!pathOrUrl) {
    return "";
  }

  const normalized = pathOrUrl.trim();
  if (!normalized) {
    return "";
  }

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    try {
      const url = new URL(normalized);
      return decodeURIComponent(url.pathname).replace(/\/+$/, "");
    } catch {
      return normalized.replace(/\/+$/, "");
    }
  }

  return decodeURIComponent(normalized).replace(/\/+$/, "");
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

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
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
    title: `${post.title} | ${siteConfig.name}`,
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
  const heroImageSource = normalizeImageSource(post.thumbnail || post.image);
  let skippedDuplicateHeroImage = false;

  return (
    <DarkOceanShell className="max-w-5xl px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mb-12">
        <Link
          href={`/${typedCategory}`}
          className="inline-flex items-center text-sm font-semibold text-slate-300 transition-colors hover:text-white"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {config.label} 목록으로 돌아가기
        </Link>
      </div>

      <header className="mb-12">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-100/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700">
            {post.categoryLabel}
          </span>
          <time className="text-sm font-medium text-slate-300" dateTime={post.date}>
            {getDisplayDate(post)}
          </time>
        </div>
        <h1 className="mb-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-[3.25rem]">
          {post.title}
        </h1>
        <p className="text-lg leading-relaxed text-slate-200">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded bg-white px-2 py-1 text-xs text-slate-700">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-12">
        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </div>

        {(post.location || isEventPost(post)) && (
          <section className="mb-10 rounded-3xl border border-slate-100 bg-slate-50 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold text-slate-900">콘텐츠 정보</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {post.location && (
                <div>
                  <p className="mb-1 text-xs font-semibold text-slate-400">위치</p>
                  <p className="text-slate-700">{post.location}</p>
                </div>
              )}
              {post.startDate && (
                <div>
                  <p className="mb-1 text-xs font-semibold text-slate-400">시작일</p>
                  <p className="text-slate-700">{post.startDate}</p>
                </div>
              )}
              {post.endDate && (
                <div>
                  <p className="mb-1 text-xs font-semibold text-slate-400">종료일</p>
                  <p className="text-slate-700">{post.endDate}</p>
                </div>
              )}
              {post.isFree !== null && post.isFree !== undefined && (
                <div>
                  <p className="mb-1 text-xs font-semibold text-slate-400">이용 요금</p>
                  <p className="text-slate-700">{post.isFree ? "무료" : "유료"}</p>
                </div>
              )}
            </div>
          </section>
        )}

        <article className="prose prose-slate max-w-none prose-lg md:prose-xl prose-headings:font-black prose-headings:tracking-tight prose-h1:text-3xl prose-h1:leading-tight sm:prose-h1:text-4xl md:prose-h1:text-[2.6rem] prose-h2:text-[1.55rem] prose-h2:leading-snug sm:prose-h2:text-[1.75rem] md:prose-h2:text-[1.9rem] prose-a:text-blue-600 prose-img:rounded-3xl prose-pre:rounded-2xl prose-pre:bg-slate-900 prose-pre:p-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src = "", alt = "" }) => {
                const normalizedSource = normalizeImageSource(src);

                if (
                  !skippedDuplicateHeroImage &&
                  heroImageSource &&
                  normalizedSource === heroImageSource
                ) {
                  skippedDuplicateHeroImage = true;
                  return null;
                }

                return <img src={src} alt={alt} />;
              },
            }}
          >
            {post.content || ""}
          </ReactMarkdown>
        </article>
      </div>

      <AdBanner />

      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-2xl">{config.emoji}</span>
            <h2 className="text-2xl font-bold text-white">관련 글</h2>
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
    </DarkOceanShell>
  );
}
