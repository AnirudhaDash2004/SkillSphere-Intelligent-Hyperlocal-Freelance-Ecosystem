import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    amount: Number,
    dueDate: Date,
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" }
  },
  { _id: false }
);

const gigSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "General" },
    skillsRequired: [{ type: String }],
    budgetMin: { type: Number, default: 0 },
    budgetMax: { type: Number, default: 0 },
    location: { type: String, default: "" },
    deadline: Date,
    documents: [{ name: String, url: String }],
    milestones: [milestoneSchema],
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ["open", "assigned", "in-progress", "completed", "cancelled"], default: "open" },
    assignedFreelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedByAdmin: { type: Boolean, default: true }
  },
  { timestamps: true }
);

gigSchema.index({ title: "text", description: "text", skillsRequired: "text", location: "text", category: "text" });

export default mongoose.model("Gig", gigSchema);
