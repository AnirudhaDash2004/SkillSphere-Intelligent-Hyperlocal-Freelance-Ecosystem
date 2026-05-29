import express from "express";
import {
  getPublicMessages,
  sendPublicMessage,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/public", protect, getPublicMessages);
router.post("/public", protect, sendPublicMessage);

export default router;