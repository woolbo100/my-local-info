export type CategoryRoute =
  | "festivals"
  | "events"
  | "benefits"
  | "food"
  | "hotplaces"
  | "dates"
  | "blog";

export interface CategoryConfig {
  route: CategoryRoute;
  label: string;
  title: string;
  description: string;
  homeDescription: string;
  emoji: string;
  cardType: "festival" | "benefit" | "place" | "blog";
  contentDirs: string[];
}

export const DEFAULT_THUMBNAIL = "/images/hero/busan-gwangan-night.jpg";

export const CATEGORY_CONFIG: Record<CategoryRoute, CategoryConfig> = {
  festivals: {
    route: "festivals",
    label: "축제",
    title: "부산 축제",
    description: "부산에서 열리는 계절별 축제 소식을 한눈에 확인하세요.",
    homeDescription: "부산에서 열리는 대표 축제를 최신순으로 모아봤어요.",
    emoji: "🎆",
    cardType: "festival",
    contentDirs: ["festivals"],
  },
  events: {
    route: "events",
    label: "행사",
    title: "부산 행사",
    description: "전시, 공연, 마켓, 지역 이벤트 등 부산 행사 정보를 정리합니다.",
    homeDescription: "공연, 전시, 팝업 같은 부산 행사 소식을 빠르게 확인해 보세요.",
    emoji: "🎉",
    cardType: "festival",
    contentDirs: ["events"],
  },
  benefits: {
    route: "benefits",
    label: "지원/혜택",
    title: "부산 지원/혜택",
    description: "지원금, 복지, 청년정책, 소상공인 혜택을 최신순으로 보여드립니다.",
    homeDescription: "놓치기 쉬운 부산 지원 혜택을 파일 기반으로 정리했어요.",
    emoji: "💰",
    cardType: "benefit",
    contentDirs: ["benefits"],
  },
  food: {
    route: "food",
    label: "부산 맛집",
    title: "부산 맛집",
    description: "동네별 부산 맛집과 카페, 간식 코스를 카드형으로 만나보세요.",
    homeDescription: "지금 가기 좋은 부산 맛집과 카페를 골라 보여드려요.",
    emoji: "🍜",
    cardType: "place",
    contentDirs: ["food"],
  },
  hotplaces: {
    route: "hotplaces",
    label: "핫플레이스",
    title: "부산 핫플레이스",
    description: "사진 찍기 좋고 분위기 좋은 부산의 핫플레이스를 모았습니다.",
    homeDescription: "요즘 반응 좋은 부산 핫플레이스만 모아봤어요.",
    emoji: "📸",
    cardType: "place",
    contentDirs: ["hotplaces"],
  },
  dates: {
    route: "dates",
    label: "데이트 코스",
    title: "부산 데이트 코스",
    description: "바다, 야경, 카페, 산책이 어우러진 부산 데이트 코스를 정리합니다.",
    homeDescription: "부산에서 분위기 있게 즐길 수 있는 데이트 코스를 소개해요.",
    emoji: "💑",
    cardType: "place",
    contentDirs: ["dates", "date-courses"],
  },
  blog: {
    route: "blog",
    label: "블로그",
    title: "부산나우 블로그",
    description: "부산 생활과 여행, 로컬 팁을 담은 블로그형 콘텐츠를 모았습니다.",
    homeDescription: "파일만 추가하면 바로 반영되는 부산나우 블로그 콘텐츠예요.",
    emoji: "📝",
    cardType: "blog",
    contentDirs: ["blog"],
  },
};

export const CATEGORY_ORDER: CategoryRoute[] = [
  "festivals",
  "events",
  "benefits",
  "food",
  "hotplaces",
  "dates",
  "blog",
];

export function isCategoryRoute(value: string): value is CategoryRoute {
  return value in CATEGORY_CONFIG;
}

export function getCategoryConfig(route: CategoryRoute): CategoryConfig {
  return CATEGORY_CONFIG[route];
}
