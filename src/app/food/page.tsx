import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import InfoCard from "@/components/cards/InfoCard";
import { foods } from "@/data/food";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "부산 맛집 및 카페 정보",
  description: "진짜 로컬들만 아는 부산의 숨은 맛집과 분위기 좋은 카페를 추천해드립니다.",
};

export default function FoodPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-none shadow-none text-slate-800">
      <SectionHeader
        title="부산 맛집 / 카페"
        description="부산의 화려한 맛을 경험해보세요. 무엇을 먹을지 고민되시나요?"
        emoji="🍜"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {foods.map((f) => (
          <InfoCard
            key={f.id}
            title={f.title}
            description={f.description}
            location={f.location}
            category={f.category}
            tags={f.tags}
            href={`#`}
            type="place"
          />
        ))}
      </div>
    </div>
  );
}
