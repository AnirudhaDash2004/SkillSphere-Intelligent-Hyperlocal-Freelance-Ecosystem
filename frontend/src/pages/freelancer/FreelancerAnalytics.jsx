import { useEffect, useState } from "react";
import api from "../../services/api.js";

const FreelancerAnalytics = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/profiles/me").then((res) => setProfile(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Freelancer Analytics</h2>
      <div className="grid">
        <div className="card">Profile Views: {profile?.profileViews || 0}</div>
        <div className="card">Earnings: ₹{profile?.earnings || 0}</div>
        <div className="card">Reputation Score: {profile?.reputationScore || 0}/100</div>
      </div>
    </section>
  );
};

export default FreelancerAnalytics;
