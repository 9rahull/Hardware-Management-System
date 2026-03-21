import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const navigate = useNavigate();

  // ✅ FETCH FUNCTION (with pagination)
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

  // ✅ DELETE
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
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

      {/* 🔽 PAGINATION */}
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
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const headerRow = {
  background: "#e2e8f0",
  textAlign: "left"
};

const row = {
  borderBottom: "1px solid #ddd",
  textAlign: "center"
};

const image = {
  width: "100px",
  height: "100px",
  objectFit: "cover", // ✅ FULL IMAGE FIX
  borderRadius: "8px"
};

const actionBox = {
  display: "flex",
  justifyContent: "center",
  gap: "10px"
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const pagination = {
  marginTop: "20px",
  textAlign: "center"
};

const pageBtn = {
  margin: "10px",
  padding: "10px 18px",
  background: "#1e293b",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default ManageProducts;