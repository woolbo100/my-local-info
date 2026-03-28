import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import InfoCard from "@/components/cards/InfoCard";
import { benefits } from "@/data/benefits";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "부산 지원 및 혜택 정보",
  description: "부산 시민이라면 누릴 수 있는 다양한 복지 및 경제적 지원 혜택을 확인하세요.",
};

export default function BenefitsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-900 border-none shadow-none">
      <SectionHeader
        title="부산 지원 / 혜택"
        description="받을 수 있는 혜택을 놓치지 마세요. 우리를 위한 정책들이 준비되어 있습니다."
        emoji="💰"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {benefits.map((b) => (
          <InfoCard
            key={b.id}
            title={b.title}
            description={b.description}
            category={b.category}
            href={`#`}
            type="benefit"
          />
        ))}
      </div>
    </div>
  );
}
