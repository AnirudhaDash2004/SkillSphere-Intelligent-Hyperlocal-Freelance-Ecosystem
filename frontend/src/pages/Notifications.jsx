import { useEffect, useState } from "react";
import api from "../services/api.js";

const Notifications = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/notifications").then((res) => setItems(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Notifications</h2>
      <div className="grid">
        {items.map((n) => <div className="card" key={n._id}>{n.message}<br /><span className="pill">{n.type}</span></div>)}
      </div>
    </section>
  );
};

export default Notifications;
