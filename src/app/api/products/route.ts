import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectDB();

    const newProduct = await Product.create(data);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}
