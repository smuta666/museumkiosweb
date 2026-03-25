
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}){
  await prisma.banner.delete({where:{id:Number(params.id)}});
  return NextResponse.json({ok:true});
}
