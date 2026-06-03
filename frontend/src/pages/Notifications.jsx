import { useEffect, useState } from "react";
import API from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data || []);
    } catch (error) {
      console.error("Failed to load notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const demoNotifications = [
    {
      title: "New proposal alert",
      message: "A freelancer can apply to your posted gig and this notification will appear here.",
      type: "Proposal",
    },
    {
      title: "Gig update alert",
      message: "When a gig is created, updated, or expires, the user can receive a notification.",
      type: "Gig",
    },
    {
      title: "Chat alert",
      message: "When a client or freelancer sends a message, the receiver can be notified.",
      type: "Chat",
    },
  ];
  const listToShow=notifications.length > 0 ? notifications : demoNotifications;
  return (
    <div className="container">
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <div className="grid">
          {listToShow.map((notification, index) => (
            <div className="card" key={notification._id || index}>
              <span className="pill">{notification.type || "Update"}</span>
              <h3>{notification.title || "Notification"}</h3>
              <p>
                {notification.message ||
                  notification.content ||
                  "You have a new update."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Notifications;