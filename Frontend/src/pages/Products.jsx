import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Products</h1>

      {/* GRID */}
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #eee",
                padding: "15px",
                borderRadius: "10px",
                background: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {/* IMAGE */}
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "contain",   // ✅ FIX QUALITY
                  background: "#f9f9f9",
                  padding: "10px",
                }}
              />

              {/* NAME */}
              <h3 style={{ marginTop: "10px" }}>{p.name}</h3>

              {/* CATEGORY */}
              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  margin: "5px 0",
                }}
              >
                {p.category}
              </p>

              {/* PRICE */}
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginTop: "5px",
                }}
              >
                Rs {p.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;