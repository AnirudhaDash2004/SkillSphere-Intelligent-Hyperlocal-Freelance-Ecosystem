import express from "express";
import { createGig, getGigs, getMyGigs, getGigById, updateGigProgress, aiRecommendations } from "../controllers/gigController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getGigs).post(protect, authorize("client"), createGig);
router.get("/my", protect, authorize("client"), getMyGigs);
router.get("/:id", protect, getGigById);
router.put("/:id/progress", protect, updateGigProgress);
router.get("/:id/recommendations", protect, aiRecommendations);

export default router;
