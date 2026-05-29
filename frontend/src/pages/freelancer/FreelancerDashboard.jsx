import { Link } from "react-router-dom";

const FreelancerDashboard = () => (
  <section>
    <h2>Freelancer Dashboard</h2>
    <div className="grid">
      <Link className="card" to="/freelancer/profile">Professional Profile</Link>
      <Link className="card" to="/freelancer/browse-gigs">Browse Gigs</Link>
      <Link className="card" to="/freelancer/proposals">My Proposals</Link>
      <Link className="card" to="/freelancer/availability">Availability Scheduler</Link>
      <Link className="card" to="/freelancer/analytics">Analytics</Link>
    </div>
  </section>
);

export default FreelancerDashboard;
