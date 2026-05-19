import express from "express";
import { getAllProducts, getProductById } from "../Controller/productController.js";

const router = express.Router();

router.get("/",    getAllProducts);   // GET /api/products?category=ID&search=kajal
router.get("/:id", getProductById);  // GET /api/products/:id

export default router;
