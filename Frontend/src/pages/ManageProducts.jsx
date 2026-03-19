import { useEffect, useState } from "react";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        console.log(data); // 🔍 check image path
        setProducts(data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/products/delete/${id}/`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter(p => p.id !== id));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Products</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ textAlign: "center" }}>
              
              {/* 🔥 IMAGE FIX HERE */}
              <td>
                {p.image ? (
                  <img
                    src={`http://127.0.0.1:8000${p.image}`}
                    alt={p.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  "No Image"
                )}
              </td>

              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>Rs {p.price}</td>
              <td>{p.stock}</td>

              <td>
                <button style={{ background: "blue", color: "white" }}>
                  Edit
                </button>
              </td>

              <td>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{ background: "red", color: "white" }}
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

export default ManageProducts;