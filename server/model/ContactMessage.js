import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String },
  orderId: { type: String },
  message: { type: String, required: true },
  status:  { type: String, enum: ["New","Seen","Replied"], default: "New" },
}, { timestamps: true });

export default mongoose.model("ContactMessage", contactSchema);
