import { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/notifications/")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(() => {
        setNotifications([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading notifications...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>🔔 Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications 🎉</p>
      ) : (
        <div>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                background: "#fff",
                border: "1px solid #eee",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ fontWeight: "bold" }}>{n.name}</p>
              <p style={{ color: "red" }}>{n.message}</p>
              <p style={{ fontSize: "12px", color: "#666" }}>
                Stock left: {n.stock}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
