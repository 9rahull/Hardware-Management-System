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
    image: "",
  });

  const [newImage, setNewImage] = useState(null);

  // FETCH PRODUCT
  useEffect(() => {
  fetch("http://127.0.0.1:8000/api/products/")
    .then(res => res.json())
    .then(data => {
      const list = data.results || data; // ✅ FIX HERE

      const found = list.find(p => p.id === parseInt(id));
      if (found) setProduct(found);
    })
    .catch(err => console.error(err));
}, [id]);

  // UPDATE
  const handleUpdate = () => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("stock", product.stock);

    if (newImage) {
      formData.append("image", newImage);
    }

    fetch(`http://127.0.0.1:8000/api/products/update/${id}/`, {
      method: "PUT",
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        alert("Product updated successfully!");
        navigate("/manage-products");
      });
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={{ marginBottom: "20px" }}>Edit Product</h1>

        {/* IMAGE PREVIEW */}
        {product.image && (
          <img
            src={product.image}
            alt="product"
            style={{ width: "150px", marginBottom: "15px" }}
          />
        )}

        <label>Name</label>
        <input
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          style={input}
        />

        <label>Category</label>
        <input
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          style={input}
        />

        <label>Price</label>
        <input
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          style={input}
        />

        <label>Stock</label>
        <input
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          style={input}
        />

        <label>Change Image</label>
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files[0])}
          style={{ marginBottom: "15px" }}
        />

        <button onClick={handleUpdate} style={btn}>
          Update Product
        </button>
      </div>
    </div>
  );
}

// 🎨 STYLES
const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#f9f5e7",
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "350px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
};

export default EditProduct;