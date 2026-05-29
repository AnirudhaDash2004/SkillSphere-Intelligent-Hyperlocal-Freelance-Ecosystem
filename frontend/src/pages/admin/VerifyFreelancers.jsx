import { useEffect, useState } from "react";
import api from "../../services/api.js";

const VerifyFreelancers = () => {
  const [profiles, setProfiles] = useState([]);
  const load = () => api.get("/profiles/freelancers").then((res) => setProfiles(res.data));
  useEffect(() => { load().catch(console.error); }, []);

  const verify = async (id) => {
    await api.put(`/admin/freelancers/${id}/verify`);
    load();
  };

  return (
    <section>
      <h2>Verify Freelancers</h2>
      <div className="grid">
        {profiles.map((p) => (
          <div className="card" key={p._id}>
            <h3>{p.user?.name}</h3>
            <p>{(p.skills || []).join(", ")}</p>
            <p>{p.verificationBadge ? "Verified" : "Not Verified"}</p>
            {!p.verificationBadge && <button onClick={() => verify(p.user?._id)}>Verify</button>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VerifyFreelancers;
