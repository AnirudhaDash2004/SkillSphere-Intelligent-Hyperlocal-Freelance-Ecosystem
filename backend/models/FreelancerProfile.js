import mongoose from "mongoose";

const freelancerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    title: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    skills: [{ type: String }],
    proficiency: [{ skill: String, level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Expert"], default: "Beginner" } }],
    portfolioGallery: [{ title: String, url: String }],
    resumeUrl: String,
    certifications: [{ name: String, issuer: String, url: String }],
    workExperience: [{ company: String, role: String, years: String }],
    availability: [{ day: String, from: String, to: String }],
    hourlyRate: { type: Number, default: 0 },
    milestonePricing: [{ title: String, amount: Number }],
    verificationBadge: { type: Boolean, default: false },
    profileViews: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    reputationScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("FreelancerProfile", freelancerProfileSchema);
