import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  // 🔐 PROTECT ROUTE
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  // 📊 FETCH DATA
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* 🔐 LOGOUT BUTTON */}
      <button
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("username");
          window.location.href = "/login";
        }}
        style={{
          background: "red",
          color: "white",
          padding: "8px 15px",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        Logout
      </button>

      {/* 👤 USERNAME */}
      <h2>Welcome, {localStorage.getItem("username")}</h2>

      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h2>{stats.total_products}</h2>
          <p>Total Products</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.total_stock}</h2>
          <p>Total Stock</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.low_stock}</h2>
          <p>Low Stock</p>
        </div>

        <div style={cardStyle}>
          <h2>Rs {stats.total_value}</h2>
          <p>Total Value</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  background: "#f5f5f5",
  borderRadius: "10px",
  textAlign: "center",
};

export default Dashboard;