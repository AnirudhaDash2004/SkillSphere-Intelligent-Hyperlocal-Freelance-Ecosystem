import express from "express";
import { adminStats, listUsers, suspendUser, verifyFreelancer, listAllGigs } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));
router.get("/stats", adminStats);
router.get("/users", listUsers);
router.put("/users/:id/suspend", suspendUser);
router.put("/freelancers/:id/verify", verifyFreelancer);
router.get("/gigs", listAllGigs);

export default router;
