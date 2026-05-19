import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoutes    from "./Routes/authRoutes.js";
import adminRoutes   from "./Routes/adminRoutes.js";
import orderRoutes   from "./Routes/orderRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";
import productRoutes from "./Routes/productRoutes.js";

dotenv.config();
connectDb();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use("/api/auth",     authRoutes);
app.use("/api/admin",    adminRoutes);
app.use("/api/orders",   orderRoutes);
app.use("/api/contact",  contactRoutes);
app.use("/api/products", productRoutes);

// Health check
app.get("/", (req, res) => res.json({ message: "Glowra API is running ✅" }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
