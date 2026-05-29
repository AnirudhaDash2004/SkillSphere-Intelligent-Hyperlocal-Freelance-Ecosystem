import { useEffect, useState } from "react";
import api from "../../services/api.js";

const FreelancerProfile = () => {
  const [form, setForm] = useState({ title: "", bio: "", location: "", skills: "", hourlyRate: 0 });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/profiles/me").then((res) => {
      const p = res.data || {};
      setForm({ title: p.title || "", bio: p.bio || "", location: p.location || "", skills: (p.skills || []).join(", "), hourlyRate: p.hourlyRate || 0 });
    }).catch(console.error);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.put("/profiles/freelancer", { ...form, skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean) });
    setMessage("Profile updated.");
  };

  return (
    <form className="form wide" onSubmit={submit}>
      <h2>Freelancer Professional Profile</h2>
      {message && <p className="success">{message}</p>}
      <input placeholder="Professional title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input placeholder="Skills, comma separated" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
      <input type="number" placeholder="Hourly Rate" value={form.hourlyRate} onChange={(e) => setForm({ ...form, hourlyRate: Number(e.target.value) })} />
      <button>Save Profile</button>
    </form>
  );
};

export default FreelancerProfile;
