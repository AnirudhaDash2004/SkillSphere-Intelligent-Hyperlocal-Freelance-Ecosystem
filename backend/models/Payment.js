import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    gig: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    gateway: { type: String, enum: ["razorpay", "stripe", "mock"], default: "mock" },
    transactionId: String,
    status: { type: String, enum: ["escrow", "released", "refunded", "failed"], default: "escrow" }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
