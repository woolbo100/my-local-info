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
  const eventSchemas = getLatestPostsByCategory("festivals", 8)
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
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#eef7ff_0%,#d9efff_30%,#b9ddf4_60%,#95c8e9_100%)]" />
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/main/buzasun_calm_sea_with_gentle_waves_soft_sunlight_reflection_o_933a687a-d858-40d0-bf87-569ccccae0a1_2.png')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(245,251,255,0.9)_0%,rgba(229,244,255,0.84)_18%,rgba(207,234,249,0.8)_42%,rgba(182,220,241,0.76)_68%,rgba(145,197,228,0.82)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.45),transparent_26%),radial-gradient(circle_at_80%_14%,rgba(255,255,255,0.22),transparent_20%),radial-gradient(circle_at_50%_60%,rgba(129,198,232,0.16),transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.86),rgba(255,255,255,0)_62%)]" />
      <div className="absolute inset-x-0 bottom-[-6rem] -z-10 h-[30rem] bg-[linear-gradient(180deg,rgba(88,160,207,0)_0%,rgba(66,142,192,0.14)_46%,rgba(32,105,157,0.22)_100%)]" />
      <div className="absolute inset-x-0 top-[24rem] -z-10 h-[22rem] bg-[radial-gradient(120%_70%_at_50%_100%,rgba(255,255,255,0.24),transparent_60%)] opacity-50" />

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
