import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_req: Request, context: any) {
  try {
    const id = context?.params?.id;

    if (!id) {
      return NextResponse.json(
        { message: "Некорректный id" },
        { status: 400 }
      );
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE event error:", error);

    return NextResponse.json(
      { message: "Ошибка при удалении мероприятия" },
      { status: 500 }
    );
  }
}