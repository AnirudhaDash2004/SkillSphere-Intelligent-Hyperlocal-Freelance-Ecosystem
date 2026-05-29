import { useEffect, useState } from "react";
import api from "../../services/api.js";

const PaymentMonitoring = () => {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    api.get("/payments").then((res) => setPayments(res.data)).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Payment Monitoring</h2>
      <div className="grid">
        {payments.map((p) => <div className="card" key={p._id}>₹{p.amount} | {p.gateway} | {p.status}</div>)}
      </div>
    </section>
  );
};

export default PaymentMonitoring;
