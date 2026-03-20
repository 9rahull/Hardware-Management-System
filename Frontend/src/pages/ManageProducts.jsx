import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    fetch(`http://127.0.0.1:8000/api/products/delete/${id}/`, {
      method: "DELETE",
    }).then(() => fetchProducts());
  };

  // ✅ EDIT NAVIGATION
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>Manage Products</h1>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "white"
      }}>
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={th}>Image</th>
            <th style={th}>Name</th>
            <th style={th}>Category</th>
            <th style={th}>Price</th>
            <th style={th}>Stock</th>
            <th style={th}>Edit</th>
            <th style={th}>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ textAlign: "center" }}>
              <td style={td}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "60px", height: "60px", objectFit: "contain" }}
                />
              </td>

              <td style={td}>{p.name}</td>
              <td style={td}>{p.category}</td>
              <td style={td}>Rs {p.price}</td>
              <td style={td}>{p.stock}</td>

              <td style={td}>
                <button
                  onClick={() => handleEdit(p.id)}
                  style={editBtn}
                >
                  Edit
                </button>
              </td>

              <td style={td}>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const editBtn = {
  background: "blue",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ManageProducts;