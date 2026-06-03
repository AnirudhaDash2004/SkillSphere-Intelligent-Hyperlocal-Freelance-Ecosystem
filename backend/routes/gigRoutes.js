import express from "express";
import {
  createGig,
  getAllGigs,
  getMyGigs,
  getGigById,
  updateGig,
  deleteGig,
  approveGig,
} from "../controllers/gigController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("client", "admin"), createGig);

router.get("/", protect, getAllGigs);

router.get("/my-gigs", protect, authorizeRoles("client", "admin"), getMyGigs);

router.get("/:id", protect, getGigById);

router.put("/:id", protect, updateGig);

router.delete("/:id", protect, deleteGig);

router.patch("/:id/approve", protect, authorizeRoles("admin"), approveGig);

export default router;