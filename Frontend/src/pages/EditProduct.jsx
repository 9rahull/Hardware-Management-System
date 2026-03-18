import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function EditProduct() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://127.0.0.1:8000/api/update-product/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        price,
        stock,
      }),
    });

    alert("Product Updated Successfully");
  };

  return (
    <>
      <Navbar />

      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow rounded w-96"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <button className="bg-emerald-600 text-white px-4 py-2 rounded">
            Update Product
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProduct;
