import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product Id is required" },
        { status: 400 }
      );
    }

    const data = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    }).lean();

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Edit successful", data: updatedProduct },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error deleting product:", e);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
