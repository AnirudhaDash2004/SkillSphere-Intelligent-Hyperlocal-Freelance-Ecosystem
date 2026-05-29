import Dispute from "../models/Dispute.js";

export const createDispute = async (req, res) => {
  try {
    const dispute = await Dispute.create({ ...req.body, raisedBy: req.user._id });
    res.status(201).json(dispute);
  } catch (error) {
    res.status(500).json({ message: "Could not create dispute", error: error.message });
  }
};

export const listDisputes = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { raisedBy: req.user._id };
    const disputes = await Dispute.find(filter).populate("gig", "title").populate("raisedBy against", "name email").sort({ createdAt: -1 });
    res.json(disputes);
  } catch (error) {
    res.status(500).json({ message: "Could not load disputes", error: error.message });
  }
};

export const resolveDispute = async (req, res) => {
  try {
    const dispute = await Dispute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dispute);
  } catch (error) {
    res.status(500).json({ message: "Could not resolve dispute", error: error.message });
  }
};
