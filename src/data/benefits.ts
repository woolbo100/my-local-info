import { Benefit } from "@/types/benefit";

export const benefits: Benefit[] = [
  {
    id: "1",
    title: "부산 청년 월세 지원사업",
    description: "부산 거주 청년들의 주거비 부담 경감을 위해 월세를 최대 20만원까지 지원합니다.",
    target: "만 18세~34세 1인 가구 청년",
    category: "주거/생활",
  },
  {
    id: "2",
    title: "동백전 캐시백 혜택",
    description: "지역화폐 동백전으로 결제 시 결제액의 일부를 현금처럼 사용 가능한 캐시백으로 돌려받습니다.",
    target: "부산 시민 전체",
    category: "경제/금융",
  },
  {
    id: "3",
    title: "임산부 및 다자녀 가정 교통비 지원",
    description: "임산부와 다자녀 가구의 이동 편의를 위해 매월 일정액의 교통비를 지원합니다.",
    target: "임산부 및 2자녀 이상 가구",
    category: "복지/교통",
  },
  {
    id: "4",
    title: "부산 우대 기업 취업 축하금",
    description: "부산 지역 우수 중소기업에 취업한 청년에게 축하금을 지급하여 장기 근속을 유도합니다.",
    target: "부산 중소기업 신규 입사 청년",
    category: "취업/교육",
  },
];
