import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const prices = await prisma.ticketPrice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(prices);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const category = String(body.category || "").trim();
    const description = String(body.description || "").trim();
    const price = Number(body.price);

    if (!category || Number.isNaN(price)) {
      return NextResponse.json(
        { message: "Заполни обязательные поля" },
        { status: 400 }
      );
    }

    const ticketPrice = await prisma.ticketPrice.create({
      data: {
        category,
        description: description || null,
        price,
      },
    });

    return NextResponse.json(ticketPrice);
  } catch (error) {
    console.error("CREATE price error:", error);

    return NextResponse.json(
      { message: "Ошибка при создании цены" },
      { status: 500 }
    );
  }
}