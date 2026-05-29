import { useState } from "react";

const ChatBox = ({ messages = [], onSend }) => {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((m) => <div className="message" key={m._id || Math.random()}>{m.text}</div>)}
      </div>
      <form onSubmit={submit} className="row">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type message..." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
