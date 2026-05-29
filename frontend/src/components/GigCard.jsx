import { Link } from "react-router-dom";

const GigCard = ({ gig, action }) => (
  <div className="card">
    <h3>{gig.title}</h3>
    <p>{gig.description}</p>
    <p><b>Location:</b> {gig.location || "Remote/Local"}</p>
    <p><b>Budget:</b> ₹{gig.budgetMin || 0} - ₹{gig.budgetMax || 0}</p>
    <p><b>Skills:</b> {(gig.skillsRequired || []).join(", ")}</p>
    <span className="pill">{gig.status}</span>
    {action}
    {gig._id && <Link to={`/freelancer/apply/${gig._id}`} className="btn small">Apply</Link>}
  </div>
);

export default GigCard;
