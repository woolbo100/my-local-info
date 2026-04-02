import React from "react";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import SectionHeader from "@/components/common/SectionHeader";
import InfoCard from "@/components/cards/InfoCard";
import AdBanner from "@/components/AdBanner";

// 임시 데이터 가져오기 (나중에 fetch나 server action으로 교체 가능)
import { festivals } from "@/data/festivals";
import { benefits } from "@/data/benefits";
import { foods } from "@/data/food";
import { hotplaces } from "@/data/hotplaces";
import { dateCourses } from "@/data/date-courses";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/site";

export default function Home() {
  const eventSchemas = festivals.slice(0, 4).map((f) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": f.title,
    "description": f.description,
    "startDate": f.startDate,
    "endDate": f.endDate,
    "location": {
      "@type": "Place",
      "name": f.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "부산광역시"
      }
    }
  }));

  const serviceSchemas = benefits.slice(0, 4).map((b) => ({
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": b.title,
    "description": b.description,
    "provider": {
      "@type": "GovernmentOrganization",
      "name": "성남시"
    }
  }));

  return (
    <div className="bg-slate-50/50 pb-20">
      {/* ... existing content ... */}
      <Hero />
      <CategoryGrid />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* ... (festivals grid) ... */}
        {/* ... (benefits grid) ... */}
        {/* ... (foods grid) ... */}
        {/* ... (hotplaces grid) ... */}
        {/* ... (dateCourses grid) ... */}
        {/* ... (blogPosts grid) ... */}
        <section>
          <SectionHeader
            title="이번 주 부산 축제"
            description="놓치면 후회할 부산의 활기찬 축제 소식입니다."
            emoji="🎉"
            viewAllLink="/blog"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {festivals.slice(0, 4).map((f) => (
              <InfoCard
                key={f.id}
                title={f.title}
                description={f.description}
                date={`${f.startDate} ~ ${f.endDate}`}
                location={f.location}
                category={f.category}
                href="/blog"
                type="festival"
              />
            ))}
          </div>
        </section>

        <AdBanner />

        <section>
          <SectionHeader
            title="지금 보는 부산 혜택"
            description="부산 시민이라면 꼭 챙겨야 할 다양한 지원 정책입니다."
            emoji="💰"
            viewAllLink="/blog"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.slice(0, 4).map((b) => (
              <InfoCard
                key={b.id}
                title={b.title}
                description={b.description}
                category={b.category}
                href="/blog"
                type="benefit"
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="부산 인기 맛집"
            description="현지인들이 추천하는 진짜 맛집 리스트입니다."
            emoji="🍜"
            viewAllLink="/blog"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foods.slice(0, 4).map((f) => (
              <InfoCard
                key={f.id}
                title={f.title}
                description={f.description}
                location={f.location}
                category={f.category}
                tags={f.tags}
                href="/blog"
                type="place"
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="부산 핫플 추천"
            description="인생샷을 부르는 부산의 힙한 명소들입니다."
            emoji="📸"
            viewAllLink="/blog"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hotplaces.slice(0, 4).map((h) => (
              <InfoCard
                key={h.id}
                title={h.title}
                description={h.description}
                location={h.location}
                category={h.category}
                tags={h.tags}
                href="/blog"
                type="place"
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="부산 데이트 코스"
            description="연인과 함께하기 좋은 로맨틱한 동선 가이드입니다."
            emoji="👩‍❤️‍👨"
            viewAllLink="/blog"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dateCourses.slice(0, 3).map((d) => (
              <InfoCard
                key={d.id}
                title={d.title}
                description={d.description}
                location={d.location}
                category={d.category}
                tags={d.tags}
                href="/blog"
                type="place"
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="최신 블로그 글"
            description="부산의 생생한 이야기를 블로그로 만나보세요."
            emoji="✍️"
            viewAllLink="/blog"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((p) => (
              <InfoCard
                key={p.id}
                title={p.title}
                description={p.description}
                date={p.date}
                category={p.category}
                tags={p.tags}
                href={`/blog/${p.slug}`}
                type="blog"
              />
            ))}
          </div>
        </section>
      </div>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([...eventSchemas, ...serviceSchemas])
        }}
      />
    </div>
  );
}
