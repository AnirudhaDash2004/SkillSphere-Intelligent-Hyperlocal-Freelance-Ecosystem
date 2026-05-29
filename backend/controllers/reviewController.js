import Review from "../models/Review.js";
import FreelancerProfile from "../models/FreelancerProfile.js";
import Notification from "../models/Notification.js";

export const createReview = async (req, res) => {
  try {
    const review = await Review.create({ ...req.body, reviewer: req.user._id });
    const avg = await Review.aggregate([
      { $match: { reviewee: review.reviewee } },
      { $group: { _id: "$reviewee", average: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    if (avg[0]) {
      await FreelancerProfile.findOneAndUpdate({ user: review.reviewee }, { reputationScore: Math.round(avg[0].average * 20) });
    }

    await Notification.create({ user: review.reviewee, type: "review", message: "You received a new review" });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Could not create review", error: error.message });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId }).populate("reviewer", "name").sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Could not load reviews", error: error.message });
  }
};
