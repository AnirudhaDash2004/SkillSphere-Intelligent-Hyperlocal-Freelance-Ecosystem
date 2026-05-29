import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    gig: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    bidAmount: { type: Number, required: true },
    estimatedCompletionTime: { type: String, required: true },
    matchScore: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "accepted", "rejected", "negotiating"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", proposalSchema);
