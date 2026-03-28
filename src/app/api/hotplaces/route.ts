import { hotplaces } from "@/data/hotplaces";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(hotplaces);
}
