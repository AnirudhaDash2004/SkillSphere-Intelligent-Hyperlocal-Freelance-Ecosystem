import { useEffect, useState } from "react";
import api from "../../services/api.js";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const load = () => api.get("/admin/users").then((res) => setUsers(res.data));
  useEffect(() => { load().catch(console.error); }, []);

  const toggle = async (user) => {
    await api.put(`/admin/users/${user._id}/suspend`, { isSuspended: !user.isSuspended });
    load();
  };

  return (
    <section>
      <h2>Manage Users</h2>
      <div className="grid">
        {users.map((u) => (
          <div className="card" key={u._id}>
            <h3>{u.name}</h3>
            <p>{u.email} | {u.role}</p>
            <p>{u.isSuspended ? "Suspended" : "Active"}</p>
            <button onClick={() => toggle(u)}>{u.isSuspended ? "Unsuspend" : "Suspend"}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageUsers;
