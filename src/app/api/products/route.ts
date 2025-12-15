import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    console.log({ formData });

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const productLink = formData.get("productLink") as string;
    const image = formData.get("image") as File;

    // if(!image) {
    //   return NextResponse.json({success:false,message:"Image is required"},{status:400});
    // }

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

    console.log({ uploadResult });
    const product = await Product.create({
      name,
      category,
      price,
      productLink,
      image: (uploadResult as { secure_url: string }).secure_url,
    });
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
