import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import InfoCard from "@/components/cards/InfoCard";
import { festivals } from "@/data/festivals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "부산 축제 및 행사 정보",
  description: "부산에서 열리는 다채로운 축제와 행사 소식을 모두 전해드립니다.",
};

export default function FestivalsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        title="부산 축제 / 행사"
        description="부산의 사계절을 가득 채우는 축제들을 만나보세요."
        emoji="🎉"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {festivals.map((f) => (
          <InfoCard
            key={f.id}
            title={f.title}
            description={f.description}
            date={`${f.startDate} ~ ${f.endDate}`}
            location={f.location}
            category={f.category}
            href={`#`}
            type="festival"
          />
        ))}
      </div>
    </div>
  );
}
