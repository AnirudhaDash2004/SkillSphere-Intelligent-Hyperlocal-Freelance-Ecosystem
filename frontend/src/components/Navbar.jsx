import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice.js";
import NotificationBell from "./NotificationBell.jsx";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">SkillSphere</Link>
      <div className="navlinks">
        {user ? (
          <>
            <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/notifications"><NotificationBell /></Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
