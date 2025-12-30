import { getAuthAdmin } from "@/lib/apiAuth";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthAdmin();
    console.log("delete admin", admin);
    if (!admin) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product Id is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.error("Error deleting product:", e);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
