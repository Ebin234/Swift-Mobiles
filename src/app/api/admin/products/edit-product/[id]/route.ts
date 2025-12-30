import { getAuthAdmin } from "@/lib/apiAuth";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthAdmin();
    console.log("editpage admin", admin);
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

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    product.name = formData.get("name");
    product.category = formData.get("category");
    product.price = formData.get("price");
    product.productLink = formData.get("productLink");

    const image = formData.get("image") as File;

    if (image) {
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
      product.image = (uploadResult as { secure_url: string }).secure_url;
      await cloudinary.uploader.destroy(product.imagePublicId);
      product.imagePublicId = (uploadResult as { public_id: string }).public_id;
    }

    const data = await product.save();
    return NextResponse.json(
      { success: true, message: "Edit successful" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
