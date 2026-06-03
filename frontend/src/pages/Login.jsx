import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const redirectByRole = (role) => {
    if (role === "client") {
      navigate("/client/dashboard");
    } else if (role === "freelancer") {
      navigate("/freelancer/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const data = res.data;

      const userData = {
        _id: data._id || data.user?._id,
        name: data.name || data.user?.name,
        email: data.email || data.user?.email,
        role: data.role || data.user?.role,
        token: data.token,
      };

      if (!userData.token) {
        setError("Login successful but token was not received.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(userData));
      redirectByRole(userData.role);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;