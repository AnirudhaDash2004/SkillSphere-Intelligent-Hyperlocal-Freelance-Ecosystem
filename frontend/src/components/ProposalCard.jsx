const ProposalCard = ({ proposal, onAccept, onReject }) => (
  <div className="card">
    <h3>{proposal.freelancer?.name || "Freelancer"}</h3>
    <p>{proposal.description}</p>
    <p><b>Bid:</b> ₹{proposal.bidAmount}</p>
    <p><b>Time:</b> {proposal.estimatedCompletionTime}</p>
    <p><b>AI Match:</b> {proposal.matchScore || 0}%</p>
    <span className="pill">{proposal.status}</span>
    <div className="row">
      {onAccept && <button onClick={() => onAccept(proposal._id)}>Accept</button>}
      {onReject && <button className="danger" onClick={() => onReject(proposal._id)}>Reject</button>}
    </div>
  </div>
);

export default ProposalCard;
