import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import InfoCard from "@/components/cards/InfoCard";
import { hotplaces } from "@/data/hotplaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "부산 핫플레이스 추천",
  description: "인물을 넘어 문화가 숨 쉬는 곳, 부산의 가장 핫한 명소들을 큐레이션해 드립니다.",
};

export default function HotplacesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-none shadow-none text-slate-900 bg-white">
      <SectionHeader
        title="부산 핫플레이스"
        description="지금 부산에서 가장 인기 있는 사진 명소와 핫한 공간들입니다."
        emoji="📸"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hotplaces.map((h) => (
          <InfoCard
            key={h.id}
            title={h.title}
            description={h.description}
            location={h.location}
            category={h.category}
            tags={h.tags}
            href={`#`}
            type="place"
          />
        ))}
      </div>
    </div>
  );
}
