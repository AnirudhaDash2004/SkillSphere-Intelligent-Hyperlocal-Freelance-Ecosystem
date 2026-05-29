import { useEffect, useState } from "react";
import api from "../../services/api.js";
import GigCard from "../../components/GigCard.jsx";

const ManageGigs = () => {
  const [gigs, setGigs] = useState([]);
  useEffect(() => {
    api.get("/admin/gigs").then((res) => setGigs(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Manage Gigs</h2>
      <div className="grid">
        {gigs.map((gig) => <GigCard key={gig._id} gig={gig} />)}
      </div>
    </section>
  );
};

export default ManageGigs;
