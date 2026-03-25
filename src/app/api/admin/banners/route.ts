
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
  return NextResponse.json(await prisma.banner.findMany());
}

export async function POST(req){
  const body = await req.json();
  const b = await prisma.banner.create({data:body});
  return NextResponse.json(b);
}
