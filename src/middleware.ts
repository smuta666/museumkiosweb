import { NextRequest, NextResponse } from "next/server";
import {
  getAdminCookieName,
  verifyAdminSessionValue,
} from "@/lib/admin-auth";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/admin/login");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const cookieValue = req.cookies.get(getAdminCookieName())?.value;
  const isAuthorized = verifyAdminSessionValue(cookieValue);

  if (!isAuthorized && !isLoginRoute) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isAuthorized && isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};