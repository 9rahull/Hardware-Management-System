import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState("");

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ FETCH CATEGORIES
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const all = data.results || data;
        const unique = [...new Set(all.map((p) => p.category))];
        setCategories(unique);
      })
      .catch(() => setCategories([]));
  }, []);

  // ✅ FETCH VENDORS
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/vendors/")
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch(() => setVendors([]));
  }, []);

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const finalCategory = isNewCategory ? newCategory : category;

    if (!finalCategory) {
      setError("Please select or enter a category.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", finalCategory);
    formData.append("price", Number(price));
    formData.append("stock", Number(stock));

    if (vendor !== "") {
      formData.append("vendor", Number(vendor));
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/products/add/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("RESPONSE FULL:", data);

      if (res.ok) {
        alert("✅ Product added successfully!");

        // reset
        setName("");
        setCategory("");
        setNewCategory("");
        setIsNewCategory(false);
        setPrice("");
        setStock("");
        setVendor("");
        setImage(null);
        setImageName("");

        navigate("/manage-products");
      } else {
        setError(JSON.stringify(data));
      }
    } catch (err) {
      setError("Server error. Please check backend.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-10">
        <h1 className="text-xl font-bold mb-1">Add Product</h1>
        <p className="text-sm text-gray-400 mb-6">
          Fill in the details to add a new product
        </p>

        {error && (
          <p className="text-red-500 mb-4 bg-red-50 p-2 rounded">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6">

          {/* NAME */}
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          {/* CATEGORY */}
          {!isNewCategory ? (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />
          )}

          <button
            type="button"
            onClick={() => setIsNewCategory(!isNewCategory)}
            className="text-sm text-blue-600 mb-3"
          >
            {isNewCategory ? "Select existing category" : "+ Add new category"}
          </button>

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          {/* STOCK */}
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          {/* VENDOR */}
          <select
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          >
            <option value="">Select Vendor</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          {/* IMAGE UPLOAD */}
          <div className="border-2 border-dashed p-4 rounded text-center hover:bg-gray-50 transition mb-4">
            <label className="cursor-pointer text-gray-600">
              📷 Click to upload image
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setImageName(e.target.files[0]?.name);
                }}
              />
            </label>

            {imageName && (
              <p className="text-sm text-green-600 mt-2">
                Selected: {imageName}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;