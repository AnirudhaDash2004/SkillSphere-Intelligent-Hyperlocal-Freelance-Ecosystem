import Payment from "../models/Payment.js";
import Gig from "../models/Gig.js";
import FreelancerProfile from "../models/FreelancerProfile.js";
import Notification from "../models/Notification.js";

export const createMockEscrowPayment = async (req, res) => {
  try {
    const gig = await Gig.findById(req.body.gig);
    if (!gig || !gig.assignedFreelancer) return res.status(400).json({ message: "Gig must be assigned first" });
    if (String(gig.client) !== String(req.user._id)) return res.status(403).json({ message: "Only client can pay" });

    const payment = await Payment.create({
      gig: gig._id,
      client: req.user._id,
      freelancer: gig.assignedFreelancer,
      amount: req.body.amount,
      gateway: req.body.gateway || "mock",
      transactionId: `MOCK-${Date.now()}`,
      status: "escrow"
    });

    await Notification.create({ user: gig.assignedFreelancer, type: "payment", message: "Payment placed in escrow" });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
};

export const releasePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    if (String(payment.client) !== String(req.user._id) && req.user.role !== "admin") return res.status(403).json({ message: "Not allowed" });

    payment.status = "released";
    await payment.save();
    await FreelancerProfile.findOneAndUpdate({ user: payment.freelancer }, { $inc: { earnings: payment.amount } });
    await Notification.create({ user: payment.freelancer, type: "payment", message: "Payment released" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Could not release payment", error: error.message });
  }
};

export const listPayments = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { $or: [{ client: req.user._id }, { freelancer: req.user._id }] };
    const payments = await Payment.find(filter).populate("gig", "title").populate("client freelancer", "name email").sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Could not load payments", error: error.message });
  }
};
