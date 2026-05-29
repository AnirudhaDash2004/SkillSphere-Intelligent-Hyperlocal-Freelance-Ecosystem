import { useEffect, useState } from "react";
import API from "../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await API.get("/chat/public");
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      const res = await API.post("/chat/public", { content });
      setMessages((prev) => [...prev, res.data]);
      setContent("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Message sending failed. Please login again.");
    }
  };

  useEffect(() => {
    fetchMessages();

    socket.on("publicMessage", (newMessage) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === newMessage._id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    });

    return () => {
      socket.off("publicMessage");
    };
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>Public Collaboration Chat</h2>
        <p>All logged-in users can see and send messages here.</p>

        <div className="chat-box">
          {messages.length === 0 ? (
            <p>No messages yet. Start the discussion.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className="message">
                <strong>
                  {msg.sender?.name || "User"} ({msg.sender?.role || "member"})
                </strong>
                <p>{msg.content}</p>
                <small>{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>

        <form onSubmit={sendMessage} className="chat-form">
          <input
            type="text"
            placeholder="Type your public message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;