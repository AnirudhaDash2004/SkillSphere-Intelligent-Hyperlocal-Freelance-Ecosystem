import { useEffect, useState } from "react";
import api from "../../services/api.js";
import GigCard from "../../components/GigCard.jsx";
const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const load = () => api.get(`/gigs?search=${encodeURIComponent(search)}`).then((res) => setGigs(res.data));
  useEffect(() => { load().catch(console.error); }, []);
  return (
    <section>
      <h2>Browse Gig Marketplace</h2>
      <div className="row">
        <input placeholder="Search by skill/title/location" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={load}>Search</button>
      </div>
      <div className="grid">
        {gigs.map((gig) => <GigCard key={gig._id} gig={gig} />)}
      </div>
    </section>
  );
};
export default BrowseGigs;