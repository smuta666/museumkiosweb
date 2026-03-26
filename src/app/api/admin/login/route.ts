import { NextResponse } from "next/server";
import {
  checkAdminCredentials,
  createAdminSessionValue,
  getAdminCookieName,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const login = String(body.login || "").trim();
    const password = String(body.password || "");

    console.log("ENV LOGIN:", process.env.ADMIN_LOGIN);
    console.log("ENV HASH:", process.env.ADMIN_PASSWORD_HASH);

    if (!login || !password) {
      return NextResponse.json(
        { message: "Логин и пароль обязательны" },
        { status: 400 }
      );
    }

    const isValid = await checkAdminCredentials(login, password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Неверный логин или пароль" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });

    response.cookies.set(getAdminCookieName(), createAdminSessionValue(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      { message: "Ошибка при входе" },
      { status: 500 }
    );
  }
}