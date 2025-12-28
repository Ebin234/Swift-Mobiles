import mongoose, { models, Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: string;
  refreshToken: string;
}

const AdminSchema = new Schema<IAdmin>({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Admin",
    enum: ["Admin","Owner"],
  },
  refreshToken: {
    type: String,
  },
});

const Admin = models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
