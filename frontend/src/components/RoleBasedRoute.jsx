import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRoute = ({ role, children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" replace />;
  return user.role === role ? children : <Navigate to={`/${user.role}/dashboard`} replace />;
};

export default RoleBasedRoute;
