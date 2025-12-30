import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { getAuthAdmin } from "@/lib/apiAuth";

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthAdmin();
    // console.log("editpage admin", admin);
    if (!admin) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url!);
    const page = Number(searchParams.get("page") ?? 1);
    let limit = Number(searchParams.get("limit") ?? 20);

    limit = limit > 30 ? 30 : limit;
    const skip = (page - 1) * limit;

    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(),
      Product.find().skip(skip).limit(limit).lean(),
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json(
      { success: true, products, totalPages },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
