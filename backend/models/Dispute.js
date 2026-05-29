import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema(
  {
    gig: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    against: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reason: { type: String, required: true },
    evidence: [{ name: String, url: String }],
    adminNotes: String,
    status: { type: String, enum: ["open", "under-review", "resolved", "rejected"], default: "open" },
    resolution: String
  },
  { timestamps: true }
);

export default mongoose.model("Dispute", disputeSchema);
