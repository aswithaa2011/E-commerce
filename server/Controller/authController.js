// authController.js - Google OAuth only
import { OAuth2Client } from "google-auth-library";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
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

// New email login handler
export const emailLogin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    // Simple validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return res.status(400).json({ message: "Invalid email format" });
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Create user with minimal info, could be extended for verification flow
      user = await User.create({ email: email.toLowerCase(), isVerified: false });
    }
    const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token: jwtToken, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Email login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


