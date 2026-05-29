import User from "../models/User.js";
import Gig from "../models/Gig.js";
import Proposal from "../models/Proposal.js";
import Payment from "../models/Payment.js";
import FreelancerProfile from "../models/FreelancerProfile.js";
import AdminLog from "../models/AdminLog.js";

export const adminStats = async (req, res) => {
  try {
    const [users, gigs, proposals, payments, freelancers, revenue] = await Promise.all([
      User.countDocuments(),
      Gig.countDocuments(),
      Proposal.countDocuments(),
      Payment.countDocuments(),
      FreelancerProfile.countDocuments(),
      Payment.aggregate([{ $match: { status: "released" } }, { $group: { _id: null, total: { $sum: "$amount" } } }])
    ]);

    const topCategories = await Gig.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 5 }]);
    const completed = await Gig.countDocuments({ status: "completed" });

    res.json({
      users,
      gigs,
      proposals,
      payments,
      activeFreelancers: freelancers,
      platformRevenue: revenue[0]?.total || 0,
      topCategories,
      jobSuccessRate: gigs ? Math.round((completed / gigs) * 100) : 0
    });
  } catch (error) {
    res.status(500).json({ message: "Could not load stats", error: error.message });
  }
};

export const listUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

export const suspendUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isSuspended: req.body.isSuspended }, { new: true }).select("-password");
  await AdminLog.create({ admin: req.user._id, action: "USER_SUSPENSION_UPDATED", targetType: "User", targetId: req.params.id });
  res.json(user);
};

export const verifyFreelancer = async (req, res) => {
  const profile = await FreelancerProfile.findOneAndUpdate(
    { user: req.params.id },
    { verificationBadge: true },
    { new: true }
  );
  await User.findByIdAndUpdate(req.params.id, { isVerified: true });
  await AdminLog.create({ admin: req.user._id, action: "FREELANCER_VERIFIED", targetType: "User", targetId: req.params.id });
  res.json(profile);
};

export const listAllGigs = async (req, res) => {
  const gigs = await Gig.find().populate("client assignedFreelancer", "name email").sort({ createdAt: -1 });
  res.json(gigs);
};
