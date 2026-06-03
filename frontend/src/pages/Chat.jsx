import { useEffect, useRef, useState } from "react";
import API from "../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);
  const fetchMessages = async () => {
    try {
      const res = await API.get("/chat/public");
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };
  const getCurrentUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to read current user:", error);
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const formatTime = (dateValue) => {
    if (!dateValue) return "";
    return new Date(dateValue).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    return new Date(dateValue).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const res = await API.post("/chat/public", {
        content: content.trim(),
      });
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === res.data._id);
        if (exists) return prev;
        return [...prev, res.data];
      });
      setContent("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Message sending failed. Please login again.");
    }
  };

  useEffect(() => {
    getCurrentUser();
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container chat-page">
      <div className="whatsapp-chat-card">
        <div className="whatsapp-chat-header">
          <div>
            <h2>SkillSphere Public Chat</h2>
            <p>Public collaboration room for clients and freelancers</p>
          </div>
          <span className="chat-status">Online</span>
        </div>
        <div className="whatsapp-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <p>No messages yet. Start the discussion.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwnMessage =
                currentUser && msg.sender?._id === currentUser._id;
              return (
                <div
                  key={msg._id}
                  className={
                    isOwnMessage
                      ? "whatsapp-message own-message"
                      : "whatsapp-message other-message"
                  }
                >
                  <div className="message-sender">
                    {msg.sender?.name || "User"}{" "}
                    <span>({msg.sender?.role || "member"})</span>
                  </div>
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">
                    {formatDate(msg.createdAt)} • {formatTime(msg.createdAt)}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="whatsapp-chat-form">
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