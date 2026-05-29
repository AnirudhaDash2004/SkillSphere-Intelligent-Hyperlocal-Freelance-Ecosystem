import Message from "../models/Message.js";

export const getPublicMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: "public" })
      .populate("sender", "name email role")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch public messages",
      error: error.message,
    });
  }
};

export const sendPublicMessage = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    const message = await Message.create({
      sender: req.user._id,
      room: "public",
      content,
    });

    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "name email role"
    );

    const io = req.app.get("io");
    if (io) {
      io.emit("publicMessage", populatedMessage);
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({
      message: "Failed to send public message",
      error: error.message,
    });
  }
};