import Message from "../models/Message.js";

const configureSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(String(userId));
    });

    socket.on("sendMessage", async (payload) => {
      try {
        const message = await Message.create(payload);
        io.to(String(payload.receiver)).emit("receiveMessage", message);
        io.to(String(payload.sender)).emit("receiveMessage", message);
      } catch (error) {
        socket.emit("socketError", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export default configureSocket;
