import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api.js";
import GigCard from "../../components/GigCard.jsx";

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/gigs/my").then((res) => setGigs(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>My Gigs</h2>
      <div className="grid">
        {gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} action={<Link className="btn small" to={`/client/gigs/${gig._id}/proposals`}>View Proposals</Link>} />
        ))}
      </div>
    </section>
  );
};

export default MyGigs;
