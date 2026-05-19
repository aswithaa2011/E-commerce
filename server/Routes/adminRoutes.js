import express from "express";
import { adminRegister, adminLogin } from "../Controller/adminController.js";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../Controller/categoryController.js";
import { getAllOrders, updateOrderStatus, getStats } from "../Controller/orderController.js";
import { getAllContacts, updateContactStatus } from "../Controller/contactController.js";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../Controller/productController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public admin auth
router.post("/register", adminRegister);
router.post("/login",    adminLogin);

// Protected admin routes (all need admin JWT)
router.get("/stats",                    adminMiddleware, getStats);

// Categories CRUD
router.get("/categories",               adminMiddleware, getCategories);
router.post("/categories",              adminMiddleware, addCategory);
router.put("/categories/:id",           adminMiddleware, updateCategory);
router.delete("/categories/:id",        adminMiddleware, deleteCategory);

// Orders
router.get("/orders",                   adminMiddleware, getAllOrders);
router.put("/orders/:id/status",        adminMiddleware, updateOrderStatus);

// Contact messages
router.get("/contacts",                 adminMiddleware, getAllContacts);
router.put("/contacts/:id/status",      adminMiddleware, updateContactStatus);

// Products CRUD
router.get("/products",                 adminMiddleware, getAllProducts);
router.post("/products",                adminMiddleware, addProduct);
router.put("/products/:id",             adminMiddleware, updateProduct);
router.delete("/products/:id",          adminMiddleware, deleteProduct);

export default router;
