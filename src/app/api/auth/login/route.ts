import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    // console.log({ formData });
    //

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // console.log({ email, password });

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      return NextResponse.json(
        { success: false, message: "Wrong password" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({
      id: admin._id,
      role: admin.role,
    });
    const refreshToken = generateRefreshToken({
      id: admin._id,
      role: admin.role,
    });

    console.log({ admin, accessToken, refreshToken });

    admin.refreshToken = refreshToken;
    await admin.save();
    
    const response = NextResponse.json({
      success: true,
      message: "login success",
    });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 20,
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to login" },
      { status: 500 }
    );
  }
}
