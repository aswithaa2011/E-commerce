import express from "express";
import { sendOtp, verifyOtp, googleAuth } from "../Controller/authController.js";

const router = express.Router();

router.post("/send-otp",    sendOtp);
router.post("/verify-otp",  verifyOtp);
router.post("/google", googleAuth);

export default router;
