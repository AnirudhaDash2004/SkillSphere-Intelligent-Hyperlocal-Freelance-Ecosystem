import FreelancerProfile from "../models/FreelancerProfile.js";
import ClientProfile from "../models/ClientProfile.js";

export const getMyProfile = async (req, res) => {
  try {
    const Model = req.user.role === "client" ? ClientProfile : FreelancerProfile;
    const profile = await Model.findOne({ user: req.user._id }).populate("user", "name email role");
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Could not load profile", error: error.message });
  }
};

export const updateFreelancerProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOneAndUpdate(
      { user: req.user._id },
      { ...req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Could not update freelancer profile", error: error.message });
  }
};

export const updateClientProfile = async (req, res) => {
  try {
    const profile = await ClientProfile.findOneAndUpdate(
      { user: req.user._id },
      { ...req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Could not update client profile", error: error.message });
  }
};

export const listFreelancers = async (req, res) => {
  try {
    const profiles = await FreelancerProfile.find().populate("user", "name email isVerified");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Could not load freelancers", error: error.message });
  }
};
