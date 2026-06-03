import { Link } from "react-router-dom";

function formatDate(dateValue) {
  if (!dateValue) return "Not set";

  return new Date(dateValue).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function GigCard({ gig, showApply = false }) {
  return (
    <div className="card">
      <h3>{gig.title}</h3>

      <p>{gig.description}</p>

      <p>
        <strong>Category:</strong> {gig.category || "General"}
      </p>

      <p>
        <strong>Location:</strong> {gig.location || "Not specified"}
      </p>

      <p>
        <strong>Budget:</strong> ₹{gig.budgetMin || 0} - ₹{gig.budgetMax || 0}
      </p>

      <p>
        <strong>Posted Date:</strong> {formatDate(gig.createdAt)}
      </p>

      <p>
        <strong>Expire Date:</strong> {formatDate(gig.deadline)}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span className="pill">{gig.status || "open"}</span>
      </p>

      <div>
        <strong>Skills Required:</strong>
        <br />
        {gig.skillsRequired && gig.skillsRequired.length > 0 ? (
          gig.skillsRequired.map((skill, index) => (
            <span className="pill" key={index}>
              {skill}
            </span>
          ))
        ) : (
          <span className="pill">No skills listed</span>
        )}
      </div>

      {showApply && (
        <Link className="btn small" to={`/freelancer/apply/${gig._id}`}>
          Apply Now
        </Link>
      )}
    </div>
  );
}

export default GigCard;