import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "museum_admin_session";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/admin/login");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const hasCookie = Boolean(req.cookies.get(COOKIE_NAME)?.value);

  if (!hasCookie && !isLoginRoute) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (hasCookie && isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};