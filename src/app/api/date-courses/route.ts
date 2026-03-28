import { dateCourses } from "@/data/date-courses";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(dateCourses);
}
