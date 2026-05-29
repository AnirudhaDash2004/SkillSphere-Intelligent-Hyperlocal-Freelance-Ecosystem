import { useState } from "react";
import api from "../../services/api.js";

const Availability = () => {
  const [availability, setAvailability] = useState([{ day: "Monday", from: "10:00", to: "18:00" }]);
  const [message, setMessage] = useState("");

  const save = async () => {
    await api.put("/profiles/freelancer", { availability });
    setMessage("Availability saved.");
  };

  return (
    <section>
      <h2>Availability Scheduler</h2>
      {message && <p className="success">{message}</p>}
      {availability.map((slot, index) => (
        <div className="row" key={index}>
          <input value={slot.day} onChange={(e) => {
            const copy = [...availability]; copy[index].day = e.target.value; setAvailability(copy);
          }} />
          <input value={slot.from} onChange={(e) => {
            const copy = [...availability]; copy[index].from = e.target.value; setAvailability(copy);
          }} />
          <input value={slot.to} onChange={(e) => {
            const copy = [...availability]; copy[index].to = e.target.value; setAvailability(copy);
          }} />
        </div>
      ))}
      <button onClick={() => setAvailability([...availability, { day: "", from: "", to: "" }])}>Add Slot</button>
      <button onClick={save}>Save</button>
    </section>
  );
};

export default Availability;
