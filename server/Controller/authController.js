import { OAuth2Client } from "google-auth-library";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/google
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body; // id_token from client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email?.toLowerCase();
    const googleId = payload.sub;
    if (!email) return res.status(400).json({ message: "Invalid Google token" });

    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = await User.create({ email, googleId, isVerified: true });
    } else {
      // Update googleId if missing
      if (!user.googleId) user.googleId = googleId;
      if (!user.isVerified) user.isVerified = true;
      await user.save();
    }
    const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token: jwtToken, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Google auth error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};




const generateOtp = () => "12345";

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
    if (otp !== "12345") return res.status(400).json({ message: "Invalid OTP" });

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
export const emailLogin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await User.create({ email: email.toLowerCase() });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Email login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
