import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  CATEGORY_CONFIG,
  CATEGORY_ORDER,
  DEFAULT_THUMBNAIL,
  type CategoryRoute,
} from "@/lib/content-config";

const contentRoot = path.join(process.cwd(), "content");

export interface ContentPost {
  title: string;
  slug: string;
  category: CategoryRoute;
  categoryLabel: string;
  date: string;
  excerpt: string;
  metaDescription?: string;
  hideExcerpt: boolean;
  thumbnail: string;
  tags: string[];
  content: string;
  route: string;
  sourcePath: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  isFree?: boolean | null;
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  const normalized = String(value || "").trim();
  return normalized || "1970-01-01";
}

function normalizeBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "yes", "y", "free", "무료"].includes(normalized)) {
      return true;
    }
    if (["false", "no", "n", "paid", "유료"].includes(normalized)) {
      return false;
    }
  }

  return null;
}

function resolveThumbnail(value: unknown) {
  const thumbnail = String(value || "").trim();
  if (!thumbnail) {
    return DEFAULT_THUMBNAIL;
  }

  if (thumbnail.startsWith("http://") || thumbnail.startsWith("https://")) {
    return thumbnail;
  }

  const localPath = path.join(process.cwd(), "public", thumbnail.replace(/^\//, ""));
  return fs.existsSync(localPath) ? thumbnail : DEFAULT_THUMBNAIL;
}

function getCategoryDirectories(category: CategoryRoute) {
  return CATEGORY_CONFIG[category].contentDirs.map((dir) => path.join(contentRoot, dir));
}

function getMarkdownFiles(directory: string) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((fileName) => /\.mdx?$/i.test(fileName))
    .map((fileName) => path.join(directory, fileName));
}

function mapFileToPost(category: CategoryRoute, fullPath: string): ContentPost {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const data = matterResult.data as Record<string, unknown>;
  const fallbackSlug = path.basename(fullPath).replace(/\.mdx?$/i, "");
  const slug = String(data.slug || fallbackSlug).trim() || fallbackSlug;
  const title = String(data.title || slug).trim() || slug;
  const excerpt = String(data.excerpt || data.summary || "").trim() || "곧 업데이트 예정입니다.";
  const metaDescription = String(data.metaDescription || "").trim() || undefined;
  const thumbnail = resolveThumbnail(data.thumbnail || data.image);
  const tags = Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [];

  return {
    title,
    slug,
    category,
    categoryLabel: CATEGORY_CONFIG[category].label,
    date: normalizeDate(data.date),
    excerpt,
    metaDescription,
    hideExcerpt: data.hideExcerpt === true,
    thumbnail,
    tags,
    content: matterResult.content.trim(),
    route: `/${category}/${slug}`,
    sourcePath: fullPath,
    location: data.location ? String(data.location) : undefined,
    startDate: data.startDate ? normalizeDate(data.startDate) : undefined,
    endDate: data.endDate ? normalizeDate(data.endDate) : undefined,
    image: data.image ? String(data.image) : undefined,
    isFree: data.isFree === undefined ? null : normalizeBoolean(data.isFree),
  };
}

function sortPosts(posts: ContentPost[]) {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByCategory(category: CategoryRoute): ContentPost[] {
  const posts = getCategoryDirectories(category)
    .flatMap((directory) => getMarkdownFiles(directory))
    .map((fullPath) => mapFileToPost(category, fullPath));

  return sortPosts(posts);
}

export function getAllPosts(): ContentPost[] {
  return sortPosts(CATEGORY_ORDER.flatMap((category) => getPostsByCategory(category)));
}

export function getLatestPostsByCategory(category: CategoryRoute, limit = 4): ContentPost[] {
  return getPostsByCategory(category).slice(0, limit);
}

export function getPostBySlug(category: CategoryRoute, slug: string): ContentPost | null {
  return getPostsByCategory(category).find((post) => post.slug === slug) ?? null;
}

export function getRelatedPosts(category: CategoryRoute, slug: string, limit = 3): ContentPost[] {
  return getPostsByCategory(category)
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function getAllPostParams() {
  return CATEGORY_ORDER.flatMap((category) =>
    getPostsByCategory(category).map((post) => ({
      category,
      slug: post.slug,
    }))
  );
}

export function getDisplayDate(post: ContentPost): string {
  if (post.startDate && post.endDate) {
    return `${post.startDate} ~ ${post.endDate}`;
  }

  return post.date;
}
