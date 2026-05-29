import Gig from "../models/Gig.js";
import FreelancerProfile from "../models/FreelancerProfile.js";
import Notification from "../models/Notification.js";
import { recommendFreelancers } from "../utils/aiMatcher.js";

export const createGig = async (req, res) => {
  try {
    const gig = await Gig.create({ ...req.body, client: req.user._id });
    await Notification.create({ user: req.user._id, type: "gig", message: `Gig posted: ${gig.title}` });
    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: "Could not create gig", error: error.message });
  }
};

export const getGigs = async (req, res) => {
  try {
    const { search, skill, location, min, max, status = "open" } = req.query;
    const filter = {};
    if (status !== "all") filter.status = status;
    if (search) filter.$text = { $search: search };
    if (skill) filter.skillsRequired = { $in: [skill] };
    if (location) filter.location = new RegExp(location, "i");
    if (min || max) filter.budgetMax = { ...(min && { $gte: Number(min) }), ...(max && { $lte: Number(max) }) };

    const gigs = await Gig.find(filter).populate("client", "name email").sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Could not load gigs", error: error.message });
  }
};

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ client: req.user._id }).sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Could not load your gigs", error: error.message });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("client assignedFreelancer", "name email role");
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: "Could not load gig", error: error.message });
  }
};

export const updateGigProgress = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    const allowed = String(gig.client) === String(req.user._id) || String(gig.assignedFreelancer) === String(req.user._id) || req.user.role === "admin";
    if (!allowed) return res.status(403).json({ message: "Not allowed" });

    gig.progress = Math.min(100, Math.max(0, Number(req.body.progress)));
    if (gig.progress === 100) gig.status = "completed";
    await gig.save();
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: "Could not update progress", error: error.message });
  }
};

export const aiRecommendations = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    const freelancers = await FreelancerProfile.find().populate("user", "name email");
    res.json(recommendFreelancers(gig, freelancers));
  } catch (error) {
    res.status(500).json({ message: "AI matching failed", error: error.message });
  }
};
