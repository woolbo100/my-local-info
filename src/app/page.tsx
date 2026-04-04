import React from "react";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import SectionHeader from "@/components/common/SectionHeader";
import InfoCard from "@/components/cards/InfoCard";
import AdBanner from "@/components/AdBanner";
import {
  CATEGORY_ORDER,
  getCategoryConfig,
  type CategoryRoute,
} from "@/lib/content-config";
import {
  getDisplayDate,
  getLatestPostsByCategory,
} from "@/lib/content";
import { buildEventJsonLd, isEventPost } from "@/lib/event-schema";

function PlaceholderCard({ label }: { label: string }) {
  return (
    <article className="bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm p-6 flex items-center justify-center min-h-[280px]">
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="mt-2 text-xs text-slate-400">곧 업데이트 예정</p>
      </div>
    </article>
  );
}

function HomeSection({ category }: { category: CategoryRoute }) {
  const config = getCategoryConfig(category);
  const posts = getLatestPostsByCategory(category, 4);

  return (
    <section>
      <SectionHeader
        title={config.label}
        description={config.homeDescription}
        emoji={config.emoji}
        viewAllLink={`/${config.route}`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              <PlaceholderCard key={`${config.route}-${index}`} label={`${config.label} 콘텐츠`} />
            ))}
      </div>
    </section>
  );
}

export default function Home() {
  const eventSchemas = ["festivals", "events"]
    .flatMap((category) => getLatestPostsByCategory(category as CategoryRoute, 4))
    .filter((post) => isEventPost(post))
    .map((post) => buildEventJsonLd(post))
    .filter(Boolean);

  const serviceSchemas = getLatestPostsByCategory("benefits", 4).map((post) => ({
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: post.title,
    description: post.excerpt,
    provider: {
      "@type": "GovernmentOrganization",
      name: "부산시",
    },
  }));

  return (
    <div className="bg-slate-50/50 pb-20">
      <Hero />
      <CategoryGrid />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {CATEGORY_ORDER.slice(0, 2).map((category) => (
          <HomeSection key={category} category={category} />
        ))}

        <AdBanner />

        {CATEGORY_ORDER.slice(2).map((category) => (
          <HomeSection key={category} category={category} />
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([...eventSchemas, ...serviceSchemas]),
        }}
      />
    </div>
  );
}
