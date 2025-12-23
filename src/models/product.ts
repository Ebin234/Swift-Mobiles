import mongoose, { Schema, models, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  image: string;
  productLink: string;
  imagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
}
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, require: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    productLink: { type: String, trim: true },
    imagePublicId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;
