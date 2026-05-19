import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email:     { type: String, required: true, unique: true, lowercase: true },
  name:      { type: String },
  phone:     { type: String },
  otp:       { type: String },
  otpExpiry: { type: Date },
  isVerified:{ type: Boolean, default: false },
  address: {
    street:  String,
    city:    String,
    state:   String,
    pincode: String,
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
