import { NextResponse } from "next/server";
import { getBootstrapContent } from "@/lib/content";

export async function GET() {
  const data = await getBootstrapContent();
  return NextResponse.json(data);
}
