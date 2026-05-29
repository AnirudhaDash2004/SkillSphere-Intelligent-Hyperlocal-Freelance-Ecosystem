import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    gig: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, default: "" },
    verified: { type: Boolean, default: true },
    fakeReviewFlag: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
