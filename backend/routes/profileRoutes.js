import express from "express";
import { getMyProfile, updateFreelancerProfile, updateClientProfile, listFreelancers } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/freelancer", protect, authorize("freelancer"), updateFreelancerProfile);
router.put("/client", protect, authorize("client"), updateClientProfile);
router.get("/freelancers", protect, listFreelancers);

export default router;
