import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.ticketPrice.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE price error:", error);

    return NextResponse.json(
      { message: "Ошибка при удалении цены" },
      { status: 500 }
    );
  }
}