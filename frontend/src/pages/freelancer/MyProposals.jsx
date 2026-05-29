import { useEffect, useState } from "react";
import api from "../../services/api.js";

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    api.get("/proposals/my/list").then((res) => setProposals(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>My Proposals</h2>
      <div className="grid">
        {proposals.map((p) => (
          <div className="card" key={p._id}>
            <h3>{p.gig?.title}</h3>
            <p>{p.description}</p>
            <p>₹{p.bidAmount} | {p.estimatedCompletionTime}</p>
            <p>AI Match: {p.matchScore}%</p>
            <span className="pill">{p.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyProposals;
