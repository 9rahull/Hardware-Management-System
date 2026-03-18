import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock),
    0
  );

  const lowStock = products.filter(product => product.stock < 10).length;

  return (

    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}

      <div
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          minHeight: "100vh",
          padding: "20px"
        }}
      >

        <h2 style={{ marginBottom: "30px" }}>Inventory</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>

          <Link to="/add-product" style={linkStyle}>Add Product</Link>

          <Link to="/manage-products" style={linkStyle}>Manage Products</Link>

          <Link to="/products" style={linkStyle}>View Products</Link>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div style={{ flex: 1, padding: "40px" }}>

        <h1>Dashboard</h1>

        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>

          <div style={cardStyle}>
            <h3>Total Products</h3>
            <h1>{totalProducts}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Total Stock</h3>
            <h1>{totalStock}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Low Stock Items</h3>
            <h1>{lowStock}</h1>
          </div>

        </div>

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

const cardStyle = {
  background: "#f1f5f9",
  padding: "30px",
  borderRadius: "10px",
  width: "250px"
};

export default Dashboard;