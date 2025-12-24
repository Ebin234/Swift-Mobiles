import mongoose, { models, Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  password: string;
}

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
