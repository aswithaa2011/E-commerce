import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No admin token" });

    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ message: "Admin not found" });

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Admin access denied" });
  }
};

export default adminMiddleware;
