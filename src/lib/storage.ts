import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

export const uploadRoot = process.env.UPLOAD_DIR || join(process.cwd(), "uploads");

export async function ensureUploadDir() {
  if (!existsSync(uploadRoot)) {
    await mkdir(uploadRoot, { recursive: true });
  }
}

export async function saveUpload(file: File) {
  await ensureUploadDir();

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.name.replace(/\s+/g, "-")}`;
  const fullPath = join(uploadRoot, safeName);

  await writeFile(fullPath, buffer);

  return {
    fileName: safeName,
    url: `/uploads/${safeName}`,
  };
}

export async function getUploadBuffer(fileName: string) {
  const fullPath = join(uploadRoot, fileName);
  return readFile(fullPath);
}
