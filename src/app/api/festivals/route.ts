import { festivals } from "@/data/festivals";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(festivals);
}
