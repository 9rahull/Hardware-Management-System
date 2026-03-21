import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts(data.results || []);
        }
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter(p => p.id !== id));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Manage Products</h1>

      <div style={tableContainer}>
        <table style={table}>
          <thead>
            <tr style={headerRow}>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={row}>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={image}
                  />
                </td>

                <td>{p.name}</td>
                <td>{p.category}</td>
                <td><b>Rs {p.price}</b></td>
                <td>{p.stock}</td>

                <td>
                  <div style={actionBox}>
                    <button
                      onClick={() => navigate(`/edit-product/${p.id}`)}
                      style={editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 🔥 STYLES */

const tableContainer = {
  background: "white",
  borderRadius: "10px",
  padding: "15px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const headerRow = {
  background: "#f1f5f9",
  textAlign: "left"
};

const row = {
  borderBottom: "1px solid #ddd",
  textAlign: "center"
};

const image = {
  width: "80px",
  height: "80px",
  objectFit: "contain", // ✅ FIX IMAGE CUT
  borderRadius: "5px"
};

const actionBox = {
  display: "flex",
  gap: "10px",
  justifyContent: "center"
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default ManageProducts;