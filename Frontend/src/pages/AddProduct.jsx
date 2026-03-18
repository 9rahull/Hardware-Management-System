import { useState } from "react";
import Navbar from "../Navbar/Navbar";

function AddProduct() {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);

    await fetch("http://127.0.0.1:8000/api/add-product/", {
      method: "POST",
      body: formData
    });

    alert("Product Added Successfully");

    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setImage(null);
  };

  return (
    <>
      <Navbar />

      <div className="p-10 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow rounded w-[500px]"
        >

          {/* Product Name */}

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 w-full mb-4"
            required
          />

          {/* Category */}

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 w-full mb-4"
            required
          />

          {/* Price */}

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-3 w-full mb-4"
            required
          />

          {/* Stock */}

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-3 w-full mb-4"
            required
          />

          {/* Image Upload */}

          <div className="mb-6">

            <label className="block mb-2 font-semibold">
              Upload Product Image
            </label>

            <label className="flex items-center justify-center border-2 border-dashed border-gray-400 p-6 rounded cursor-pointer hover:bg-gray-50">

              <span className="text-2xl mr-3">⬆</span>

              <span className="text-gray-600">
                {image ? image.name : "Click to upload image"}
              </span>

              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />

            </label>

          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded"
          >
            Add Product
          </button>

        </form>

      </div>
    </>
  );
}

export default AddProduct;