import express from "express";
import { createDispute, listDisputes, resolveDispute } from "../controllers/disputeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, listDisputes);
router.post("/", protect, createDispute);
router.put("/:id/resolve", protect, authorize("admin"), resolveDispute);

export default router;
