import User from "../models/User.js";

export const searchUsers = async (req, res) => {
  try {
    const q = req.query.q || "";
    const users = await User.find({
      $or: [{ name: new RegExp(q, "i") }, { email: new RegExp(q, "i") }]
    }).select("name email role isVerified").limit(20);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Could not search users", error: error.message });
  }
};
