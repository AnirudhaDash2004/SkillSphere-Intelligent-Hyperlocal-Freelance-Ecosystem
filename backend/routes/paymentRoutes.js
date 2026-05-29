import express from "express";
import { createMockEscrowPayment, releasePayment, listPayments } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listPayments);
router.post("/escrow", protect, createMockEscrowPayment);
router.put("/:id/release", protect, releasePayment);

export default router;
