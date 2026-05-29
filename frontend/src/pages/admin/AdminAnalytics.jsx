import { useEffect, useState } from "react";
import api from "../../services/api.js";

const AdminAnalytics = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Admin Analytics</h2>
      <div className="grid">
        <div className="card">Platform Revenue: ₹{stats.platformRevenue || 0}</div>
        <div className="card">Active Freelancers: {stats.activeFreelancers || 0}</div>
        <div className="card">Payments: {stats.payments || 0}</div>
        <div className="card">Job Success Rate: {stats.jobSuccessRate || 0}%</div>
      </div>
    </section>
  );
};

export default AdminAnalytics;
