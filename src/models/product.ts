import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, require: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    productLink: { type: String },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;
