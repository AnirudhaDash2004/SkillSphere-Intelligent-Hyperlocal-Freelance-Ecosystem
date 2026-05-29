import { useEffect, useState } from "react";
import api from "../services/api.js";

const Disputes = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/disputes").then((res) => setItems(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Dispute Resolution System</h2>
      <div className="grid">
        {items.map((d) => <div className="card" key={d._id}>{d.reason}<br /><span className="pill">{d.status}</span></div>)}
      </div>
    </section>
  );
};

export default Disputes;
