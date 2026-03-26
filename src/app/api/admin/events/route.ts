import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { startDate: "asc" },
  });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const startDate = String(formData.get("startDate") || "").trim();
    const endDate = String(formData.get("endDate") || "").trim();
    const file = formData.get("file") as File | null;

    if (!title || !description || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Заполни все обязательные поля" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeFileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const uploadDir = process.env.UPLOAD_DIR || "public/uploads";
      const filePath = path.join(process.cwd(), uploadDir, safeFileName);

      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${safeFileName}`;
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        imageUrl,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("CREATE event error:", error);

    return NextResponse.json(
      { message: "Ошибка при создании мероприятия" },
      { status: 500 }
    );
  }
}