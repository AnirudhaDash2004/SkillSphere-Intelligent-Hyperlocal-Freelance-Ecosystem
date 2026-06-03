import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { setUser } from "../redux/slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
    location: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goToDashboard = (role) => {
    const cleanRole = role?.toLowerCase();

    if (cleanRole === "client") {
      navigate("/client/dashboard");
    } else if (cleanRole === "freelancer") {
      navigate("/freelancer/dashboard");
    } else if (cleanRole === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        location: form.location,
      });

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      };

      dispatch(setUser(userData));
      setLoading(false);
      goToDashboard(userData.role);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={submit}>
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;