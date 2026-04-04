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
import { getDisplayDate, getLatestPostsByCategory } from "@/lib/content";
import { buildEventJsonLd, isEventPost } from "@/lib/event-schema";

function PlaceholderCard({ label }: { label: string }) {
  return (
    <article className="flex min-h-[280px] items-center justify-center rounded-[20px] border border-white/75 bg-white/90 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.1)] backdrop-blur-sm">
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-600">{label}</p>
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
              <PlaceholderCard
                key={`${config.route}-${index}`}
                label={`${config.label} 콘텐츠`}
              />
            ))}
      </div>
    </section>
  );
}

export default function Home() {
  const eventSchemas = ["festivals", "events"]
    .flatMap((category) =>
      getLatestPostsByCategory(category as CategoryRoute, 4),
    )
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
    <div className="relative overflow-hidden pb-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#eef7ff_0%,#d9efff_28%,#bfe3f7_58%,#9fd0ee_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.18),transparent_22%),radial-gradient(circle_at_50%_62%,rgba(121,197,235,0.22),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.82),rgba(255,255,255,0)_62%)]" />
      <div className="absolute inset-x-0 bottom-[-6rem] -z-10 h-[28rem] bg-[linear-gradient(180deg,rgba(120,193,234,0)_0%,rgba(74,151,204,0.16)_48%,rgba(33,112,171,0.24)_100%)]" />
      <div className="absolute left-1/2 top-[26rem] -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(255,255,255,0)_72%)]" />
      <div className="absolute inset-x-0 top-[24rem] -z-10 h-[20rem] bg-[radial-gradient(120%_70%_at_50%_100%,rgba(255,255,255,0.28),transparent_60%)] opacity-40" />

      <Hero />
      <CategoryGrid />

      <div className="mx-auto max-w-7xl space-y-24 px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
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
