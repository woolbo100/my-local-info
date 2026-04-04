import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/common/SectionHeader";
import InfoCard from "@/components/cards/InfoCard";
import DarkOceanShell from "@/components/layout/DarkOceanShell";
import {
  CATEGORY_ORDER,
  getCategoryConfig,
  isCategoryRoute,
  type CategoryRoute,
} from "@/lib/content-config";
import { getDisplayDate, getPostsByCategory } from "@/lib/content";
import { siteConfig } from "@/data/site";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

function PlaceholderCard({ label }: { label: string }) {
  return (
    <article className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/70 bg-white/92 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm">
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="mt-2 text-xs text-slate-400">곧 업데이트 예정</p>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return CATEGORY_ORDER.map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isCategoryRoute(category)) {
    return {};
  }

  const config = getCategoryConfig(category);
  return {
    title: `${config.title} | ${siteConfig.name}`,
    description: config.description,
    alternates: {
      canonical: `${siteConfig.url}/${config.route}`,
    },
    openGraph: {
      title: `${config.title} | ${siteConfig.name}`,
      description: config.description,
      url: `${siteConfig.url}/${config.route}`,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  if (!isCategoryRoute(category)) {
    notFound();
  }

  const typedCategory = category as CategoryRoute;
  const config = getCategoryConfig(typedCategory);
  const posts = getPostsByCategory(typedCategory);

  return (
    <DarkOceanShell className="max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title={config.title}
        description={config.description}
        emoji={config.emoji}
        tone="light"
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.length > 0
          ? posts.map((post) => (
              <InfoCard
                key={post.route}
                title={post.title}
                description={post.excerpt}
                date={getDisplayDate(post)}
                location={post.location}
                category={post.categoryLabel}
                tags={post.tags}
                image={post.thumbnail}
                href={post.route}
                type={config.cardType}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <PlaceholderCard
                key={`${config.route}-${index}`}
                label={`${config.label} 콘텐츠`}
              />
            ))}
      </div>
    </DarkOceanShell>
  );
}
