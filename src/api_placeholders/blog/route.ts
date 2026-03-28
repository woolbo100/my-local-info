import { blogPosts } from "@/data/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(blogPosts);
}
