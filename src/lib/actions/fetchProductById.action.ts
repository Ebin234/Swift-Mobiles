import Product from "@/models/product";
import { connectDB } from "../mongodb";

export const fetchProductById = async (id: string) => {
  try {
    await connectDB();
    console.log("fetchProduct", id);
    const product = await Product.findById(id).lean();
    console.log("fetch", product);
    const jsonData = JSON.parse(JSON.stringify(product));
    console.log("jsondata", jsonData);
    console.log({ jsonData });
    return { success: true, jsonData };
  } catch (error) {
    console.log({ error });
    return { success: false, e: error };
  }
};
