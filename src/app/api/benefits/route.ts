import { benefits } from "@/data/benefits";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(benefits);
}
