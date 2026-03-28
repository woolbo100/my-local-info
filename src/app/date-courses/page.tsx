import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import InfoCard from "@/components/cards/InfoCard";
import { dateCourses } from "@/data/date-courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "부산 데이트 코스 가이드",
  description: "부산에서 특별한 추억을 만들 수 있는 테마별 데이트 코스를 추천합니다.",
};

export default function DateCoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white border-none shadow-none text-slate-900">
      <SectionHeader
        title="부산 데이트 코스"
        description="사랑하는 연인과 가기 좋은 로맨틱한 동선들을 정리했습니다."
        emoji="👩‍❤️‍👨"
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dateCourses.map((d) => (
          <InfoCard
            key={d.id}
            title={d.title}
            description={d.description}
            location={d.location}
            category={d.category}
            tags={d.tags}
            href={`#`}
            type="place"
          />
        ))}
      </div>
    </div>
  );
}
