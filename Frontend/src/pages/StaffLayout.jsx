import { Link, Outlet, useNavigate } from "react-router-dom";

function StaffLayout() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isAdmin = localStorage.getItem("is_admin");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("is_admin");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Brand */}
        <h2
          style={{ marginBottom: "6px", fontSize: "15px", fontWeight: "700" }}
        >
          Staff Panel
        </h2>
        <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "24px" }}>
          {username} · {isAdmin === "true" ? "Admin" : "Staff"}
        </p>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flex: 1,
          }}
        >
          <Link to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>
          <Link to="/add-product" style={linkStyle}>
            Add Product
          </Link>
          <Link to="/manage-products" style={linkStyle}>
            Manage Products
          </Link>
          <Link to="/products" style={linkStyle}>
            View Products
          </Link>
          <Link to="/predict-demand" style={linkStyle}>
            Demand Analytics
          </Link>
          <Link to="/vendors" style={linkStyle}>
            🏢 Vendors
          </Link>
        </div>

        {/* Logout at bottom */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            background: "rgba(239,68,68,0.15)",
            color: "#fca5a5",
            border: "1px solid rgba(239,68,68,0.3)",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "500",
            textAlign: "left",
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, background: "#f9fafb", overflow: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px",
  background: "#334155",
  borderRadius: "5px",
  fontSize: "14px",
};

export default StaffLayout;
