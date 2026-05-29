import Gig from "../models/Gig.js";
import Proposal from "../models/Proposal.js";
import FreelancerProfile from "../models/FreelancerProfile.js";
import Notification from "../models/Notification.js";
import { calculateSkillMatch } from "../utils/aiMatcher.js";

export const submitProposal = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    if (gig.status !== "open") return res.status(400).json({ message: "Gig is not open" });

    const profile = await FreelancerProfile.findOne({ user: req.user._id });
    const matchScore = calculateSkillMatch(gig.skillsRequired, profile?.skills || []);

    const proposal = await Proposal.create({
      gig: gig._id,
      freelancer: req.user._id,
      matchScore,
      ...req.body
    });

    await Notification.create({ user: gig.client, type: "proposal", message: `New proposal for ${gig.title}` });
    res.status(201).json(proposal);
  } catch (error) {
    res.status(500).json({ message: "Could not submit proposal", error: error.message });
  }
};

export const getGigProposals = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    if (String(gig.client) !== String(req.user._id) && req.user.role !== "admin") return res.status(403).json({ message: "Not allowed" });

    const proposals = await Proposal.find({ gig: req.params.gigId }).populate("freelancer", "name email").sort({ matchScore: -1 });
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: "Could not load proposals", error: error.message });
  }
};

export const getMyProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ freelancer: req.user._id }).populate("gig", "title budgetMax status").sort({ createdAt: -1 });
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: "Could not load your proposals", error: error.message });
  }
};

export const updateProposalStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const proposal = await Proposal.findById(req.params.id).populate("gig");
    if (!proposal) return res.status(404).json({ message: "Proposal not found" });
    if (String(proposal.gig.client) !== String(req.user._id)) return res.status(403).json({ message: "Only client can update proposal" });

    proposal.status = status;
    await proposal.save();

    if (status === "accepted") {
      proposal.gig.status = "assigned";
      proposal.gig.assignedFreelancer = proposal.freelancer;
      await proposal.gig.save();
    }

    await Notification.create({ user: proposal.freelancer, type: "proposal", message: `Your proposal was ${status}` });
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ message: "Could not update proposal", error: error.message });
  }
};
