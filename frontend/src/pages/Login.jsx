import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { setUser } from "../redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const data = res.data;

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      };

      if (!userData.token) {
        setError("Login failed because token was not received.");
        setLoading(false);
        return;
      }

      dispatch(setUser(userData));
      setLoading(false);
      goToDashboard(userData.role);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Invalid email or password");
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