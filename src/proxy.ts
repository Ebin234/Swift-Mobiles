export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;
  console.log({pathname})

  if (
    refreshToken &&
    (pathname == "/auth/login" || pathname === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (!refreshToken && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*","/auth/:path*"],
};
