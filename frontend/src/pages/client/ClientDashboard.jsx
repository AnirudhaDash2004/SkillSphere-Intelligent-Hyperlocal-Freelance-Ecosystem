import { Link } from "react-router-dom";

const ClientDashboard = () => (
  <section>
    <h2>Client Dashboard</h2>
    <div className="grid">
      <Link className="card" to="/client/create-gig">Create Gig / Project</Link>
      <Link className="card" to="/client/my-gigs">My Gigs & Proposals</Link>
      <Link className="card" to="/client/payments">Payments</Link>
      <Link className="card" to="/chat">Real-time Chat</Link>
    </div>
  </section>
);

export default ClientDashboard;
