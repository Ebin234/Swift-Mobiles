import Product from "@/models/product";
import { connectDB } from "../mongodb";

export const fetchProductById = async (id: string) => {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    const jsonData = JSON.parse(JSON.stringify(product));
    return { success: true, jsonData };
  } catch (error) {
    console.log({ error });
    return { success: false, e: error };
  }
};
