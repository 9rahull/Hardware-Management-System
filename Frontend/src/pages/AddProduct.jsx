// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

// function AddProduct() {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [newCategory, setNewCategory] = useState("");
//   const [isNewCategory, setIsNewCategory] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [vendors, setVendors] = useState([]);
//   const [vendor, setVendor] = useState("");

//   const navigate = useNavigate();

//   // fetch existing categories from products
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/products/")
//       .then((res) => res.json())
//       .then((data) => {
//         const all = data.results || data;
//         // get unique categories only
//         const unique = [...new Set(all.map((p) => p.category))];
//         setCategories(unique);
//       })
//       .catch(() => setCategories([]));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // use new category if user typed one, otherwise use selected
//     const finalCategory = isNewCategory ? newCategory : category;

//     if (!finalCategory) {
//       setError("Please select or enter a category.");
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("category", finalCategory);
//     formData.append("price", price);
//     formData.append("stock", stock);
//     if (image) formData.append("image", image);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/products/add/", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         alert("Product added successfully!");
//         setName("");
//         setCategory("");
//         setNewCategory("");
//         setIsNewCategory(false);
//         setPrice("");
//         setStock("");
//         setImage(null);
//         navigate("/manage-products");
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     } catch {
//       setError("Server error. Please check your connection.");
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-xl mx-auto px-6 py-10">
//         {/* Page title */}
//         <h1 className="text-xl font-bold text-gray-900 mb-1">Add Product</h1>
//         <p className="text-sm text-gray-400 mb-6">
//           Fill in the details to add a new product
//         </p>

//         {/* Error */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
//             {error}
//           </div>
//         )}

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white border border-gray-200 rounded-xl p-6"
//         >
//           {/* Product Name */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name
//             </label>
//             <input
//               type="text"
//               placeholder="e.g. Sink Mixer"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           {/* Category */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>

//             {/* Toggle between existing and new */}
//             <div className="flex gap-2 mb-2">
//               <button
//                 type="button"
//                 onClick={() => setIsNewCategory(false)}
//                 className={`text-xs px-3 py-1 rounded-lg border transition ${
//                   !isNewCategory
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white text-gray-500 border-gray-300"
//                 }`}
//               >
//                 Select existing
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsNewCategory(true)}
//                 className={`text-xs px-3 py-1 rounded-lg border transition ${
//                   isNewCategory
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white text-gray-500 border-gray-300"
//                 }`}
//               >
//                 + Add new category
//               </button>
//             </div>

//             {/* Existing categories dropdown */}
//             {!isNewCategory && (
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
//               >
//                 <option value="">Select a category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             )}

//             {/* New category input */}
//             {isNewCategory && (
//               <input
//                 type="text"
//                 placeholder="e.g. Plumbing Fittings"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
//               />
//             )}
//           </div>

//           {/* Price */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Price (Rs)
//             </label>
//             <input
//               type="number"
//               placeholder="e.g. 1500"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           {/* Stock */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Stock Quantity
//             </label>
//             <input
//               type="number"
//               placeholder="e.g. 50"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Image
//             </label>
//             <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
//               <span className="text-xl mr-3">📷</span>
//               <span className="text-sm text-gray-500">
//                 {image ? image.name : "Click to upload image"}
//               </span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </label>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50"
//             >
//               {loading ? "Adding..." : "Add Product"}
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate("/manage-products")}
//               className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2.5 rounded-lg text-sm transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default AddProduct;

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
  const [image, setImage] = useState(null);

  // ✅ NEW STATES
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch categories
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

  // ✅ Fetch vendors
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/vendors/")
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch(() => setVendors([]));
  }, []);

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
    formData.append("price", price);
    formData.append("stock", stock);

    // ✅ SEND VENDOR
    if (vendor) formData.append("vendor", vendor);

    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/products/add/", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Product added successfully!");
        navigate("/manage-products");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Server error. Please check your connection.");
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

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl p-6"
        >
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

          {/* ✅ VENDOR DROPDOWN */}
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

          {/* IMAGE */}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-4"
          />

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
