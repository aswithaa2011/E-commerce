import User from "../model/User.js";
import jwt from "jsonwebtoken";

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// POST /api/auth/send-otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await User.create({ email: email.toLowerCase() });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    console.log(`OTP for ${email}: ${otp}`);

    return res.status(200).json({
      message: "OTP sent successfully",
      otp, // REMOVE this in production!
    });
  } catch (err) {
    console.error("Send OTP error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/verify-otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired. Request a new one." });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
