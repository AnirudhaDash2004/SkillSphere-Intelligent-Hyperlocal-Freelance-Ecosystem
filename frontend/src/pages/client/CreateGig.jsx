import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function CreateGig() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    skillsRequired: "",
    location: "",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await API.post("/gigs", {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skillsRequired: formData.skillsRequired,
        location: formData.location,
        budgetMin: formData.budgetMin,
        budgetMax: formData.budgetMax,
        deadline: formData.deadline,
      });

      setMessage("Gig posted successfully.");

      setFormData({
        title: "",
        description: "",
        category: "",
        skillsRequired: "",
        location: "",
        budgetMin: "",
        budgetMax: "",
        deadline: "",
      });

      setTimeout(() => {
        navigate("/client/my-gigs");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form wide" onSubmit={handleSubmit}>
        <h2>Post a New Gig</h2>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skillsRequired"
          placeholder="Skills required, comma separated"
          value={formData.skillsRequired}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="number"
          name="budgetMin"
          placeholder="Minimum Amount"
          value={formData.budgetMin}
          onChange={handleChange}
        />

        <input
          type="number"
          name="budgetMax"
          placeholder="Maximum Amount"
          value={formData.budgetMax}
          onChange={handleChange}
        />

        <label>Expire Date / Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Gig"}
        </button>
      </form>
    </div>
  );
}

export default CreateGig;