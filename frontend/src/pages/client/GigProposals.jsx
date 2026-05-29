import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.js";
import ProposalCard from "../../components/ProposalCard.jsx";

const GigProposals = () => {
  const { gigId } = useParams();
  const [proposals, setProposals] = useState([]);

  const load = () => api.get(`/proposals/gig/${gigId}`).then((res) => setProposals(res.data));
  useEffect(() => { load().catch(console.error); }, [gigId]);

  const updateStatus = async (id, status) => {
    await api.put(`/proposals/${id}/status`, { status });
    load();
  };

  return (
    <section>
      <h2>Gig Proposals</h2>
      <div className="grid">
        {proposals.map((p) => (
          <ProposalCard key={p._id} proposal={p} onAccept={(id) => updateStatus(id, "accepted")} onReject={(id) => updateStatus(id, "rejected")} />
        ))}
      </div>
    </section>
  );
};

export default GigProposals;
