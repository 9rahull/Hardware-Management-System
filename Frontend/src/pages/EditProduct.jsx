import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  // ✅ LOAD SINGLE PRODUCT
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        if (found) setProduct(found);
      });
  }, [id]);

  // ✅ UPDATE
  const handleUpdate = () => {
    fetch(`http://127.0.0.1:8000/api/products/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then(res => res.json())
      .then(() => {
        alert("Updated successfully");
        navigate("/manage-products");
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Product</h1>

      <input
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        placeholder="Name"
        style={input}
      />

      <input
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        placeholder="Category"
        style={input}
      />

      <input
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        placeholder="Price"
        style={input}
      />

      <input
        value={product.stock}
        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
        placeholder="Stock"
        style={input}
      />

      <button onClick={handleUpdate} style={btn}>
        Update Product
      </button>
    </div>
  );
}

const input = {
  display: "block",
  margin: "10px 0",
  padding: "10px",
  width: "300px",
};

const btn = {
  background: "green",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
};

export default EditProduct;