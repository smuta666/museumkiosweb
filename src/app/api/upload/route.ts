import { saveUpload } from "@/lib/storage";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Файл обязателен" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ message: "Разрешены только изображения" }, { status: 400 });
  }

  const saved = await saveUpload(file);

  return NextResponse.json(saved);
}