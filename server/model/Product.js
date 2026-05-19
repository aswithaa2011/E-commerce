import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  offprice:    { type: Number },
  percent:     { type: String },
  img:         { type: String },
  description: { type: String, default: "Premium Glowra beauty product." },
  stock:       { type: Number, default: 50 },
  isActive:    { type: Boolean, default: true },

  // KEY ADDITION: link product to a category
  categoryId:  { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  categoryName:{ type: String }, // denormalized for fast reads
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
