import mongoose, { models, Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
}

const AdminSchema = new Schema({
  email: {
    type: String,
    unique:true,
    required: true,
    trim:true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    default:"Admin",
    enum: ["Admin"]
  }
});

const Admin = models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
