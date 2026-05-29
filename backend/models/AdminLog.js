import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    targetType: String,
    targetId: String,
    details: String
  },
  { timestamps: true }
);

export default mongoose.model("AdminLog", adminLogSchema);
