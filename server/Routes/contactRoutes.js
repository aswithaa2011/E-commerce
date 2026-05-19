import express from "express";
import { submitContact } from "../Controller/contactController.js";

const router = express.Router();

router.post("/", submitContact);

export default router;
