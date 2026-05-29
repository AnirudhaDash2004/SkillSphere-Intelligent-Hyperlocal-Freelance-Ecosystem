import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api.js";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Admin Dashboard</h2>
      <div className="grid">
        <div className="card">Users: {stats.users || 0}</div>
        <div className="card">Gigs: {stats.gigs || 0}</div>
        <div className="card">Proposals: {stats.proposals || 0}</div>
        <div className="card">Success Rate: {stats.jobSuccessRate || 0}%</div>
        <Link className="card" to="/admin/users">Manage Users</Link>
        <Link className="card" to="/admin/gigs">Manage Gigs</Link>
      </div>
    </section>
  );
};

export default AdminDashboard;
