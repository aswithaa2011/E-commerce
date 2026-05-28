import express from "express";
import { googleAuth } from "../Controller/authController.js";

const router = express.Router();

router.post("/google", googleAuth);

export default router;

import { sendOtp, verifyOtp, googleAuth, emailLogin } from "../Controller/authController.js";

const router = express.Router();

router.post("/send-otp",    sendOtp);
router.post("/email-login", emailLogin);
router.post("/google", googleAuth);

export default router;
