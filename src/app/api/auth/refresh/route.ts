import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload: any = verifyRefreshToken(refreshToken);
    const admin = await Admin.findById(payload.id);
    if (!admin || admin.refreshToken !== refreshToken) {
      const response = NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      response.cookies.delete("refreshToken");
      return response;
    }

    const newAccessToken = generateAccessToken({
      id: admin._id,
      role: admin.role,
    });
    const newRefreshToken = generateRefreshToken({
      id: admin._id,
      role: admin.role,
    });

    admin.refreshToken = newRefreshToken;
    await admin.save();

    const response = NextResponse.json({ accessToken:newAccessToken });

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 10*60,
    });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({});
  }
}
