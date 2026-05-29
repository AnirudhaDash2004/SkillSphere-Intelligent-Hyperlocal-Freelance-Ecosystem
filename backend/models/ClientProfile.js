import mongoose from "mongoose";

const clientProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    companyName: String,
    location: String,
    description: String,
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("ClientProfile", clientProfileSchema);
