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
    return NextResponse.json({ success: true, message: "login success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to login" },
      { status: 500 }
    );
  }
}
