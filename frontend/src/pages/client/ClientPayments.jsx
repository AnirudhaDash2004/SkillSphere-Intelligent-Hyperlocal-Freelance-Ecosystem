import { useEffect, useState } from "react";
import api from "../../services/api.js";

const ClientPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get("/payments").then((res) => setPayments(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Client Payments</h2>
      <div className="grid">
        {payments.map((p) => <div className="card" key={p._id}>₹{p.amount} - {p.status} - {p.gig?.title}</div>)}
      </div>
    </section>
  );
};

export default ClientPayments;
