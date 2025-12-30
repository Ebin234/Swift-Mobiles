import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Admin from "@/models/admin";


export async function POST(req:NextRequest){
    try{
      await connectDB();
      const formData = await req.formData();

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const passwordHash = await bcrypt.hash(password,10);
      const res = await Admin.create({email,password:passwordHash,role:"Admin"});

      return NextResponse.json({success:true,message:res},{status:201});
    }catch (error) {
        console.error(error);
        return NextResponse.json(
          { success: false, error: "Failed to register" },
          { status: 500 }
        );
      }
} 