import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/apiAuth";

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthAdmin();
    // console.log("delete admin", admin);
    if (!admin) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    await connectDB();
    const formData = await req.formData();

    // console.log({ formData });

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const productLink = formData.get("productLink") as string;
    const image = formData.get("image") as File;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "products" },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    // console.log({ uploadResult });
    const product = await Product.create({
      name,
      category,
      price,
      productLink,
      image: (uploadResult as { secure_url: string }).secure_url,
      imagePublicId: (uploadResult as { public_id: string }).public_id,
    });
    // console.log("created Product", product);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to add product" },
      { status: 500 }
    );
  }
}
