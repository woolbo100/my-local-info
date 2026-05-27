export const BLOG_CATEGORY_LABELS = [
  "전체",
  "부산 여행",
  "데이트·맛집",
  "AI·창업",
] as const;

export type BlogCategoryLabel = (typeof BLOG_CATEGORY_LABELS)[number];
export type BlogCategory = Exclude<BlogCategoryLabel, "전체">;

const BLOG_CATEGORY_QUERY_MAP: Record<string, BlogCategory> = {
  travel: "부산 여행",
  datefood: "데이트·맛집",
  aistartup: "AI·창업",
};

const BLOG_CATEGORY_BY_SLUG: Record<string, BlogCategory> = {
  "2026-04-27-why-americans-love-busan": "부산 여행",
  "bts-busan-concert-june-guide": "부산 여행",
  "busan-buddhas-birthday-temple-top7": "부산 여행",
  "busan-concert-hotel-guide": "부산 여행",
  "busan-concert-impact": "AI·창업",
  "busan-date-course-best5": "데이트·맛집",
  "busan-family-hotel-staycation-best5": "부산 여행",
  "busan-family-photo-studio-top4": "부산 여행",
  "busan-foreign-tourist-hotplace": "부산 여행",
  "busan-kidscafe-best5-guide": "데이트·맛집",
  "busan-ocean-walk-course-2026": "부산 여행",
  "busan-one-day-course-guide": "부산 여행",
  "busan-tour-trend": "AI·창업",
  "haeundae-clubd-oasis-guide": "부산 여행",
};

export function isBlogCategory(value: string): value is BlogCategory {
  return BLOG_CATEGORY_LABELS.slice(1).includes(value as BlogCategory);
}

export function getBlogCategoryFromQuery(value?: string): BlogCategory | null {
  if (!value) {
    return null;
  }

  return BLOG_CATEGORY_QUERY_MAP[value] ?? null;
}

export function getBlogCategoryQueryValue(category: BlogCategory): string {
  return Object.entries(BLOG_CATEGORY_QUERY_MAP).find(
    ([, value]) => value === category
  )?.[0] ?? "travel";
}

export function resolveBlogCategory(
  slug: string,
  frontmatterValue?: string | null
): BlogCategory {
  if (frontmatterValue && isBlogCategory(frontmatterValue)) {
    return frontmatterValue;
  }

  return BLOG_CATEGORY_BY_SLUG[slug] ?? "부산 여행";
}
