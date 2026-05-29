import express from "express";
import { submitProposal, getGigProposals, getMyProposals, updateProposalStatus } from "../controllers/proposalController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/:gigId", protect, authorize("freelancer"), submitProposal);
router.get("/gig/:gigId", protect, getGigProposals);
router.get("/my/list", protect, authorize("freelancer"), getMyProposals);
router.put("/:id/status", protect, authorize("client"), updateProposalStatus);

export default router;
