import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  const banners = await prisma.banner.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json(banners);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = String(formData.get("title") || "").trim();
    const file = formData.get("file") as File | null;

    if (!title || !file) {
      return NextResponse.json(
        { message: "Название и файл обязательны" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeFileName = `${Date.now()}-${file.name.replace(/\\s+/g, "-")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", safeFileName);

    await writeFile(filePath, buffer);

    const banner = await prisma.banner.create({
      data: {
        title,
        imageUrl: `/uploads/${safeFileName}`,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при создании баннера" },
      { status: 500 }
    );
  }
}