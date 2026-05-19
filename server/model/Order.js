import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name:     String,
  img:      String,
  price:    Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  orderId:    { type: String, required: true, unique: true },
  userEmail:  { type: String, required: true },
  items:      [itemSchema],
  totalPrice: { type: Number, required: true },
  totalItems: { type: Number },
  status:     {
    type: String,
    enum: ["Pending","Processing","Shipped","Delivered","Cancelled"],
    default: "Processing",
  },
  paymentMethod: { type: String, default: "COD" }, // "Online" or "COD"
  paymentId:     { type: String },
  address: {
    street:  String,
    city:    String,
    state:   String,
    pincode: String,
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
