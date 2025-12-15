"use server";

import Product from "@/models/product";
import { connectDB } from "../mongodb";

export const deleteProduct = async (id: string) => {
  console.log({ id });
  try {
    await connectDB();
    const data = await Product.findByIdAndDelete(id);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
