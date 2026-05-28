import express from "express";
import { sendOtp, verifyOtp, googleAuth, emailLogin } from "../Controller/authController.js";

const router = express.Router();

router.post("/send-otp",    sendOtp);
router.post("/email-login", emailLogin);
router.post("/google", googleAuth);

export default router;
