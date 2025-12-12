import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
