import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import InfoCard from "@/components/cards/InfoCard";
import { blogPosts } from "@/data/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "부산 로컬 블로그",
  description: "부산의 생생한 이야기를 담은 로컬 소식지입니다.",
};

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white shadow-none border-none text-slate-800">
      <SectionHeader
        title="로컬 블로그 / 소식"
        description="부산 토박이와 여행 작가들이 전하는 생생한 부산 이야기."
        emoji="✍️"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogPosts.map((p) => (
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
    </div>
  );
}
