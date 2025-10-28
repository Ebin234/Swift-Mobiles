import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, require: true },
    price: { type: Number, required: true },
    image: { type: String },
    productLink: { type: String },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;
