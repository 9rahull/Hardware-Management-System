import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  // ✅ FETCH PRODUCTS
  const fetchProducts = (url = "http://127.0.0.1:8000/api/products/") => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results || []);
        setNextPage(data.next);
        setPrevPage(data.previous);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ CONFIRM DELETE
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/products/delete/${deleteId}/`,
        { method: "DELETE" },
      );

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
      } else {
        alert("❌ Delete failed");
      }
    } catch {
      alert("❌ Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Manage Products</h1>

      {/* TABLE */}
      <div style={container}>
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
                  <img src={p.image} alt={p.name} style={image} />
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>
                  <b>Rs {p.price}</b>
                </td>
                <td>{p.stock}</td>

                <td>
                  <div style={actionBox}>
                    <button
                      onClick={() => navigate(`/edit-product/${p.id}`)}
                      style={editBtn}
                    >
                      Edit
                    </button>

                    <button onClick={() => setDeleteId(p.id)} style={deleteBtn}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div style={pagination}>
        {prevPage && (
          <button onClick={() => fetchProducts(prevPage)} style={pageBtn}>
            ⬅ Previous
          </button>
        )}
        {nextPage && (
          <button onClick={() => fetchProducts(nextPage)} style={pageBtn}>
            Next ➡
          </button>
        )}
      </div>

      {/* 🔥 MODERN POPUP */}
      {deleteId && (
        <div style={overlay}>
          <div style={modal}>
            <h2 style={{ marginBottom: "10px" }}>Delete Product</h2>

            <p style={{ color: "#555", marginBottom: "20px" }}>
              Are you sure you want to delete this product?
            </p>

            <div style={buttonRow}>
              <button onClick={() => setDeleteId(null)} style={cancelBtn}>
                Cancel
              </button>

              <button onClick={confirmDelete} style={confirmBtn}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const headerRow = {
  background: "#e2e8f0",
  textAlign: "left",
};

const row = {
  borderBottom: "1px solid #ddd",
  textAlign: "center",
};

const image = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
  borderRadius: "8px",
};

const actionBox = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const pagination = {
  marginTop: "20px",
  textAlign: "center",
};

const pageBtn = {
  margin: "10px",
  padding: "10px 18px",
  background: "#1e293b",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

/* 🔥 MODAL STYLES */

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  width: "320px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
};

const cancelBtn = {
  flex: 1,
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  background: "#f9f9f9",
  cursor: "pointer",
};

const confirmBtn = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  background: "#dc2626",
  color: "white",
  cursor: "pointer",
};

export default ManageProducts;
