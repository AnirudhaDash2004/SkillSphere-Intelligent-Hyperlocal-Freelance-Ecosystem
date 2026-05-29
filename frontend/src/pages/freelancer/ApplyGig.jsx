import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.js";

const ApplyGig = () => {
  const { gigId } = useParams();
  const [form, setForm] = useState({ description: "", bidAmount: 0, estimatedCompletionTime: "" });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post(`/proposals/${gigId}`, form);
    setMessage("Proposal submitted with AI match score.");
  };

  return (
    <form className="form wide" onSubmit={submit}>
      <h2>Submit Proposal</h2>
      {message && <p className="success">{message}</p>}
      <textarea placeholder="Proposal description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input type="number" placeholder="Bid amount" value={form.bidAmount} onChange={(e) => setForm({ ...form, bidAmount: Number(e.target.value) })} />
      <input placeholder="Estimated completion time" value={form.estimatedCompletionTime} onChange={(e) => setForm({ ...form, estimatedCompletionTime: e.target.value })} />
      <button>Submit Proposal</button>
    </form>
  );
};

export default ApplyGig;
