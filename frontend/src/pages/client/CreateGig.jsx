import { useState } from "react";
import api from "../../services/api.js";

const CreateGig = () => {
  const [form, setForm] = useState({ title: "", description: "", category: "", skillsRequired: "", location: "", budgetMin: 0, budgetMax: 0 });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, skillsRequired: form.skillsRequired.split(",").map((s) => s.trim()).filter(Boolean) };
    await api.post("/gigs", payload);
    setMessage("Gig created successfully.");
    setForm({ title: "", description: "", category: "", skillsRequired: "", location: "", budgetMin: 0, budgetMax: 0 });
  };

  return (
    <form className="form wide" onSubmit={submit}>
      <h2>Create Gig</h2>
      {message && <p className="success">{message}</p>}
      <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Skills required, comma separated" value={form.skillsRequired} onChange={(e) => setForm({ ...form, skillsRequired: e.target.value })} />
      <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <div className="row">
        <input type="number" placeholder="Budget Min" value={form.budgetMin} onChange={(e) => setForm({ ...form, budgetMin: Number(e.target.value) })} />
        <input type="number" placeholder="Budget Max" value={form.budgetMax} onChange={(e) => setForm({ ...form, budgetMax: Number(e.target.value) })} />
      </div>
      <button>Post Gig</button>
    </form>
  );
};

export default CreateGig;
