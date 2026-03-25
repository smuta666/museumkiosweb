
import { NextResponse } from "next/server";

export function middleware(req){
  if(req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.includes("login")){
    if(req.cookies.get("admin")?.value!=="yes"){
      return NextResponse.redirect(new URL("/admin/login",req.url));
    }
  }
  return NextResponse.next();
}

export const config={matcher:["/admin/:path*"]};
