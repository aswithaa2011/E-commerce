import express from "express";
import { googleAuth, emailLogin } from "../Controller/authController.js";

const router = express.Router();

router.post("/google", googleAuth);
router.post("/email", emailLogin);

export default router;
