export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/jwt";
import Product from "./models/product";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) return NextResponse.redirect(new URL("/auth/login", req.url));

  try {
   const data= verifyAccessToken(token);
   console.log({data})
    return NextResponse.next();
  } catch (error) {
    console.log({error})
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*","/api/products/:path+"],
};
