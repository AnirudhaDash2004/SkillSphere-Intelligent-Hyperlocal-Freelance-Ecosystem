import { useEffect, useState } from "react";
import API from "../../services/api";
import GigCard from "../../components/GigCard";

function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchMyGigs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/gigs/my-gigs");
      setGigs(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your gigs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyGigs();
  }, []);

  return (
    <div className="container">
      <h2>My Gigs</h2>
      {loading && <p>Loading your gigs...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && gigs.length === 0 && (
        <div className="card">
          <p>No gigs found. Create a new gig first.</p>
        </div>
      )}
      <div className="grid">
        {gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
    </div>
  );
}
export default MyGigs;