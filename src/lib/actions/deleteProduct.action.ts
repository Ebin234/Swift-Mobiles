"use server";

import Product from "@/models/product";
import { connectDB } from "../mongodb";
import cloudinary from "../cloudinary";

export const deleteProduct = async (id: string) => {
  console.log({ id });
  try {
    await connectDB();
    const data = await Product.findByIdAndDelete(id);
    console.log("delete",data)
    await cloudinary.uploader.destroy(data.imagePublicId);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
