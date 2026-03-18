import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "20px" }}>Hardware Products</h1>

      {/* Category Buttons */}
      <div style={{ marginBottom: "30px" }}>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setCategory(cat)}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              background: category === cat ? "green" : "#ddd",
              color: category === cat ? "white" : "black",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              background: "#fff",
            }}
          >
            {/* PRODUCT IMAGE */}
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />

            <h3>{product.name}</h3>
            <p style={{ color: "#666" }}>{product.category}</p>
            <p style={{ color: "green", fontWeight: "bold" }}>
              Rs {product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;