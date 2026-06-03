import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      skillsRequired,
      location,
      budgetMin,
      budgetMax,
      deadline,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const skillsArray =
      typeof skillsRequired === "string"
        ? skillsRequired
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "")
        : skillsRequired || [];

    const gig = await Gig.create({
      client: req.user._id,
      title,
      description,
      category: category || "General",
      skillsRequired: skillsArray,
      location: location || "",
      budgetMin: Number(budgetMin) || 0,
      budgetMax: Number(budgetMax) || 0,
      deadline: deadline || null,
    });

    res.status(201).json({
      message: "Gig created successfully",
      gig,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create gig",
      error: error.message,
    });
  }
};

export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find()
      .populate("client", "name email role location")
      .populate("assignedFreelancer", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gigs",
      error: error.message,
    });
  }
};

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ client: req.user._id })
      .populate("client", "name email role location")
      .populate("assignedFreelancer", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your gigs",
      error: error.message,
    });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate("client", "name email role location")
      .populate("assignedFreelancer", "name email role");

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    res.status(200).json(gig);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gig",
      error: error.message,
    });
  }
};

export const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    if (
      gig.client.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this gig",
      });
    }

    const {
      title,
      description,
      category,
      skillsRequired,
      location,
      budgetMin,
      budgetMax,
      deadline,
      progress,
      status,
    } = req.body;

    if (title !== undefined) gig.title = title;
    if (description !== undefined) gig.description = description;
    if (category !== undefined) gig.category = category;
    if (location !== undefined) gig.location = location;
    if (budgetMin !== undefined) gig.budgetMin = Number(budgetMin);
    if (budgetMax !== undefined) gig.budgetMax = Number(budgetMax);
    if (deadline !== undefined) gig.deadline = deadline || null;
    if (progress !== undefined) gig.progress = Number(progress);
    if (status !== undefined) gig.status = status;

    if (skillsRequired !== undefined) {
      gig.skillsRequired =
        typeof skillsRequired === "string"
          ? skillsRequired
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill !== "")
          : skillsRequired;
    }

    const updatedGig = await gig.save();

    res.status(200).json({
      message: "Gig updated successfully",
      gig: updatedGig,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update gig",
      error: error.message,
    });
  }
};

export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    if (
      gig.client.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this gig",
      });
    }

    await gig.deleteOne();

    res.status(200).json({
      message: "Gig deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete gig",
      error: error.message,
    });
  }
};

export const approveGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    gig.approvedByAdmin = true;
    await gig.save();

    res.status(200).json({
      message: "Gig approved successfully",
      gig,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve gig",
      error: error.message,
    });
  }
};