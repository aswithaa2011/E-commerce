import express from "express";
import { placeOrder, getMyOrders } from "../Controller/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",                      authMiddleware, placeOrder);
router.get("/my",                     authMiddleware, getMyOrders);

export default router;
