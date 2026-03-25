import { NextResponse } from "next/server";
import { extname } from "path";
import { getUploadBuffer } from "@/lib/storage";

export const runtime = "nodejs";

function contentTypeFromExt(name: string) {
  const ext = extname(name).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const fileName = path.join("/");
    const file = await getUploadBuffer(fileName);

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentTypeFromExt(fileName),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
