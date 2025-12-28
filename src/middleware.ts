import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const authToken = req.headers.get("authorization");
  if (!authToken) return NextResponse.redirect(new URL("/auth/login", req.url));

  try {
    const token = authToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
    matcher:["/admin/:path*"]
}