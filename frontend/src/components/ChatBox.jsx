import { useEffect, useRef, useState } from "react";

const ChatBox = ({ messages = [], onSend }) => {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="whatsapp-chat-card">
      <div className="whatsapp-chat-header">
        <div>
          <h2>SkillSphere Chat</h2>
          <p>Real-time collaboration</p>
        </div>
        <span className="chat-status">Online</span>
      </div>
      <div className="whatsapp-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>No messages yet. Start the discussion.</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              className="whatsapp-message other-message"
              key={m._id || Math.random()}
            >
              <div className="message-content">{m.text || m.content}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={submit} className="whatsapp-chat-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default ChatBox;