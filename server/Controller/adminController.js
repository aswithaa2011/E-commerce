import Admin from "../model/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// POST /api/admin/register
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await Admin.findOne({ email: email.toLowerCase() });
    if (exists)
      return res.status(409).json({ message: "Admin with this email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email: email.toLowerCase(), password: hashed });

    return res.status(201).json({
      message: "Admin registered successfully",
      adminId: admin._id,
    });
  } catch (err) {
    console.error("Admin register error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/admin/login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin)
      return res.status(404).json({ message: "Admin not found. Please register first." });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
