import { Link, Outlet } from "react-router-dom";

function StaffLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Staff Panel</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          <Link to="/add-product" style={linkStyle}>Add Product</Link>
          <Link to="/manage-products" style={linkStyle}>Manage Products</Link>
          <Link to="/products" style={linkStyle}>View Products</Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px", background: "#f9f5e7" }}>
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
  borderRadius: "5px"
};

export default StaffLayout;