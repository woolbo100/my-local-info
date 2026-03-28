import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "busan-local-food-top-3",
    title: "현지인이 추천하는 부산 진짜 맛집 TOP 3",
    description: "관광객들만 아는 곳이 아닌, 부산 사람들이 실제로 줄 서서 먹는 맛집을 소개합니다.",
    content: "여기에 상세 내용이 들어갑니다...",
    date: "2024-03-28",
    author: "부산 토박이",
    category: "맛집탐방",
    tags: ["로컬추천", "밀면", "국밥"],
  },
  {
    id: "2",
    slug: "how-to-enjoy-fireworks-festival",
    title: "부산 불꽃축제, 명당 자리 잡는 꿀팁",
    description: "유료 티켓 없이도 불꽃을 가장 예쁘게 볼 수 있는 포인트들을 정리해 드립니다.",
    content: "축제 명당 가이드...",
    date: "2024-03-25",
    author: "여행 전문가",
    category: "꿀팁",
    tags: ["불꽃축제", "관람팁"],
  },
  {
    id: "3",
    slug: "weekend-date-course-yeongdo",
    title: "이번 주 주말 데이트는 영도에서! 감성 코스 추천",
    description: "흰여울문화마을부터 영도 카페까지, 하루를 꽉 채운 감성 데이트 코스입니다.",
    content: "영도 데이트 코스 상세 안내...",
    date: "2024-03-22",
    author: "데이트 코치",
    category: "데이트",
    tags: ["영도", "감성여행"],
  },
];
