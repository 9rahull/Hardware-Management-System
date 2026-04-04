// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [image, setImage] = useState(null);

//   const [vendor, setVendor] = useState("");
//   const [originalVendor, setOriginalVendor] = useState(""); // ✅ FIX
//   const [vendors, setVendors] = useState([]);

//   const [imageName, setImageName] = useState("");

//   // ✅ FETCH PRODUCT
//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/products/${id}/`)
//       .then((res) => res.json())
//       .then((product) => {
//         if (!product || product.error) {
//           alert("Product not found");
//           return;
//         }

//         setName(product.name || "");
//         setCategory(product.category || "");
//         setPrice(product.price || "");
//         setStock(product.stock || "");

//         // 🔥 FIX: store vendor properly
//         const vendorId = product.vendor ? String(product.vendor) : "";
//         setVendor(vendorId);
//         setOriginalVendor(vendorId);
//       })
//       .catch(() => {
//         alert("Failed to load product");
//       });
//   }, [id]);

//   // ✅ FETCH VENDORS
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/vendors/")
//       .then((res) => res.json())
//       .then((data) => setVendors(data));
//   }, []);

//   // ✅ UPDATE PRODUCT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("category", category);
//     formData.append("price", price);
//     formData.append("stock", stock);

//     // 🔥 FIX: always send vendor
//     const finalVendor = vendor !== "" ? vendor : originalVendor;
//     if (finalVendor !== "") {
//       formData.append("vendor", Number(finalVendor));
//     }

//     if (image) {
//       formData.append("image", image);
//     }

//     const res = await fetch(
//       `http://127.0.0.1:8000/api/products/update/${id}/`,
//       {
//         method: "PUT",
//         body: formData,
//       }
//     );

//     if (res.ok) {
//       alert("✅ Product updated successfully!");
//       navigate("/manage-products");
//     } else {
//       alert("❌ Update failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* NAME */}
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Product Name"
//           className="w-full border p-3 rounded"
//         />

//         {/* CATEGORY */}
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Category"
//           className="w-full border p-3 rounded"
//         />

//         {/* PRICE */}
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           placeholder="Price"
//           className="w-full border p-3 rounded"
//         />

//         {/* STOCK */}
//         <input
//           type="number"
//           value={stock}
//           onChange={(e) => setStock(e.target.value)}
//           placeholder="Stock"
//           className="w-full border p-3 rounded"
//         />

//         {/* VENDOR */}
//         <select
//           value={vendor}
//           onChange={(e) => setVendor(e.target.value)}
//           className="w-full border p-3 rounded"
//         >
//           <option value="">Select Vendor</option>
//           {vendors.map((v) => (
//             <option key={v.id} value={v.id}>
//               {v.name}
//             </option>
//           ))}
//         </select>

//         {/* IMAGE UPLOAD */}
//         <div className="border-2 border-dashed p-4 rounded text-center hover:bg-gray-50 transition">
//           <label className="cursor-pointer text-gray-600">
//             📷 Click to upload image
//             <input
//               type="file"
//               className="hidden"
//               onChange={(e) => {
//                 setImage(e.target.files[0]);
//                 setImageName(e.target.files[0]?.name);
//               }}
//             />
//           </label>

//           {imageName && (
//             <p className="text-sm text-green-600 mt-2">
//               Selected: {imageName}
//             </p>
//           )}
//         </div>

//         {/* BUTTON */}
//         <button className="bg-blue-600 text-white px-4 py-3 rounded w-full hover:bg-blue-700 transition">
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditProduct;


// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [image, setImage] = useState(null);

//   const [vendor, setVendor] = useState("");
//   const [vendors, setVendors] = useState([]);

//   const [imageName, setImageName] = useState("");

//   // ✅ FETCH PRODUCT
//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/products/${id}/`)
//       .then((res) => res.json())
//       .then((product) => {
//         console.log("PRODUCT:", product);

//         if (!product || product.error) {
//           alert("Product not found");
//           return;
//         }

//         setName(product.name || "");
//         setCategory(product.category || "");
//         setPrice(product.price || "");
//         setStock(product.stock || "");

//         // 🔥 FIX: keep vendor as number
//         setVendor(product.vendor ?? "");
//       })
//       .catch(() => {
//         alert("Failed to load product");
//       });
//   }, [id]);

//   // ✅ FETCH VENDORS
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/vendors/")
//       .then((res) => res.json())
//       .then((data) => setVendors(data));
//   }, []);

//   // ✅ UPDATE PRODUCT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("category", category);
//     formData.append("price", price);
//     formData.append("stock", stock);

//     // 🔥 FIX: send correct vendor
//     if (vendor !== "") {
//       formData.append("vendor", vendor);
//     }

//     if (image) {
//       formData.append("image", image);
//     }

//     const res = await fetch(
//       `http://127.0.0.1:8000/api/products/update/${id}/`,
//       {
//         method: "PUT",
//         body: formData,
//       }
//     );

//     const data = await res.json();
//     console.log("UPDATE RESPONSE:", data);

//     if (res.ok) {
//       alert("✅ Product updated successfully!");
//       navigate("/manage-products");
//     } else {
//       alert("❌ Update failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* NAME */}
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Product Name"
//           className="w-full border p-3 rounded"
//         />

//         {/* CATEGORY */}
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Category"
//           className="w-full border p-3 rounded"
//         />

//         {/* PRICE */}
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           placeholder="Price"
//           className="w-full border p-3 rounded"
//         />

//         {/* STOCK */}
//         <input
//           type="number"
//           value={stock}
//           onChange={(e) => setStock(e.target.value)}
//           placeholder="Stock"
//           className="w-full border p-3 rounded"
//         />

//         {/* VENDOR */}
//         <select
//           value={vendor}
//           onChange={(e) =>
//             setVendor(e.target.value === "" ? "" : Number(e.target.value))
//           }
//           className="w-full border p-3 rounded"
//         >
//           <option value="">Select Vendor</option>
//           {vendors.map((v) => (
//             <option key={v.id} value={v.id}>
//               {v.name}
//             </option>
//           ))}
//         </select>

//         {/* IMAGE UPLOAD */}
//         <div className="border-2 border-dashed p-4 rounded text-center hover:bg-gray-50 transition">
//           <label className="cursor-pointer text-gray-600">
//             📷 Click to upload image
//             <input
//               type="file"
//               className="hidden"
//               onChange={(e) => {
//                 setImage(e.target.files[0]);
//                 setImageName(e.target.files[0]?.name);
//               }}
//             />
//           </label>

//           {imageName && (
//             <p className="text-sm text-green-600 mt-2">
//               Selected: {imageName}
//             </p>
//           )}
//         </div>

//         {/* BUTTON */}
//         <button className="bg-blue-600 text-white px-4 py-3 rounded w-full hover:bg-blue-700 transition">
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditProduct;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const [vendor, setVendor] = useState("");
  const [vendors, setVendors] = useState([]);

  const [imageName, setImageName] = useState("");

  // ✅ FETCH PRODUCT
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => res.json())
      .then((product) => {
        console.log("PRODUCT:", product);

        if (!product || product.error) {
          alert("Product not found");
          return;
        }

        setName(product.name || "");
        setCategory(product.category || "");
        setPrice(product.price || "");
        setStock(product.stock || "");

        // ✅ FIX: Convert vendor to STRING so <select> matches correctly
        setVendor(product.vendor !== null && product.vendor !== undefined ? String(product.vendor) : "");
      })
      .catch(() => {
        alert("Failed to load product");
      });
  }, [id]);

  // ✅ FETCH VENDORS
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/vendors/")
      .then((res) => res.json())
      .then((data) => setVendors(data));
  }, []);

  // ✅ UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);

    // ✅ FIX: Send vendor as Number to backend
    if (vendor !== "") {
      formData.append("vendor", Number(vendor));
    }

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(
      `http://127.0.0.1:8000/api/products/update/${id}/`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const data = await res.json();
    console.log("UPDATE RESPONSE:", data);

    if (res.ok) {
      alert("✅ Product updated successfully!");
      navigate("/manage-products");
    } else {
      alert("❌ Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full border p-3 rounded"
        />

        {/* CATEGORY */}
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full border p-3 rounded"
        />

        {/* PRICE */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full border p-3 rounded"
        />

        {/* STOCK */}
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          className="w-full border p-3 rounded"
        />

        {/* ✅ FIX: vendor stays as string, no conversion on change */}
        <select
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Vendor</option>
          {vendors.map((v) => (
            <option key={v.id} value={String(v.id)}>
              {v.name}
            </option>
          ))}
        </select>

        {/* IMAGE UPLOAD */}
        <div className="border-2 border-dashed p-4 rounded text-center hover:bg-gray-50 transition">
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
        <button className="bg-blue-600 text-white px-4 py-3 rounded w-full hover:bg-blue-700 transition">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;