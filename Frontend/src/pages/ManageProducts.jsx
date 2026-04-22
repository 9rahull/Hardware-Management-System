// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const [nextPage, setNextPage] = useState(null);
//   const [prevPage, setPrevPage] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   const navigate = useNavigate();

//   // ✅ FETCH PRODUCTS
//   const fetchProducts = (url = "http://127.0.0.1:8000/api/products/") => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data.results || []);
//         setNextPage(data.next);
//         setPrevPage(data.previous);
//       })
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ✅ CONFIRM DELETE
//   const confirmDelete = async () => {
//     if (!deleteId) return;

//     try {
//       const res = await fetch(
//         `http://127.0.0.1:8000/api/products/delete/${deleteId}/`,
//         { method: "DELETE" },
//       );

//       if (res.ok) {
//         setProducts((prev) => prev.filter((p) => p.id !== deleteId));
//         setDeleteId(null);
//       } else {
//         alert("❌ Delete failed");
//       }
//     } catch {
//       alert("❌ Server error");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ marginBottom: "20px" }}>Manage Products</h1>

//       {/* TABLE */}
//       <div style={container}>
//         <table style={table}>
//           <thead>
//             <tr style={headerRow}>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((p) => (
//               <tr key={p.id} style={row}>
//                 <td>
//                   <img src={p.image} alt={p.name} style={image} />
//                 </td>
//                 <td>{p.name}</td>
//                 <td>{p.category}</td>
//                 <td>
//                   <b>Rs {p.price}</b>
//                 </td>
//                 <td>{p.stock}</td>

//                 <td>
//                   <div style={actionBox}>
//                     <button
//                       onClick={() => navigate(`/edit-product/${p.id}`)}
//                       style={editBtn}
//                     >
//                       Edit
//                     </button>

//                     <button onClick={() => setDeleteId(p.id)} style={deleteBtn}>
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div style={pagination}>
//         {prevPage && (
//           <button onClick={() => fetchProducts(prevPage)} style={pageBtn}>
//             ⬅ Previous
//           </button>
//         )}
//         {nextPage && (
//           <button onClick={() => fetchProducts(nextPage)} style={pageBtn}>
//             Next ➡
//           </button>
//         )}
//       </div>

//       {/* 🔥 MODERN POPUP */}
//       {deleteId && (
//         <div style={overlay}>
//           <div style={modal}>
//             <h2 style={{ marginBottom: "10px" }}>Delete Product</h2>

//             <p style={{ color: "#555", marginBottom: "20px" }}>
//               Are you sure you want to delete this product?
//             </p>

//             <div style={buttonRow}>
//               <button onClick={() => setDeleteId(null)} style={cancelBtn}>
//                 Cancel
//               </button>

//               <button onClick={confirmDelete} style={confirmBtn}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* 🎨 STYLES */

// const container = {
//   background: "white",
//   borderRadius: "12px",
//   padding: "20px",
//   boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse",
// };

// const headerRow = {
//   background: "#e2e8f0",
//   textAlign: "left",
// };

// const row = {
//   borderBottom: "1px solid #ddd",
//   textAlign: "center",
// };

// const image = {
//   width: "100px",
//   height: "100px",
//   objectFit: "cover",
//   borderRadius: "8px",
// };

// const actionBox = {
//   display: "flex",
//   justifyContent: "center",
//   gap: "10px",
// };

// const editBtn = {
//   background: "#2563eb",
//   color: "white",
//   border: "none",
//   padding: "6px 14px",
//   borderRadius: "6px",
//   cursor: "pointer",
// };

// const deleteBtn = {
//   background: "#dc2626",
//   color: "white",
//   border: "none",
//   padding: "6px 14px",
//   borderRadius: "6px",
//   cursor: "pointer",
// };

// const pagination = {
//   marginTop: "20px",
//   textAlign: "center",
// };

// const pageBtn = {
//   margin: "10px",
//   padding: "10px 18px",
//   background: "#1e293b",
//   color: "white",
//   border: "none",
//   borderRadius: "6px",
//   cursor: "pointer",
// };

// /* 🔥 MODAL STYLES */

// const overlay = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   background: "rgba(0,0,0,0.4)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 1000,
// };

// const modal = {
//   background: "white",
//   padding: "25px",
//   borderRadius: "10px",
//   width: "320px",
//   textAlign: "center",
//   boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
// };

// const buttonRow = {
//   display: "flex",
//   gap: "10px",
// };

// const cancelBtn = {
//   flex: 1,
//   padding: "10px",
//   border: "1px solid #ccc",
//   borderRadius: "6px",
//   background: "#f9f9f9",
//   cursor: "pointer",
// };

// const confirmBtn = {
//   flex: 1,
//   padding: "10px",
//   border: "none",
//   borderRadius: "6px",
//   background: "#dc2626",
//   color: "white",
//   cursor: "pointer",
// };

// export default ManageProducts;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState(1);
  const navigate = useNavigate();

  const fetchProducts = (url = `${BASE_URL}/api/products/`) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results || []);
        setNextPage(data.next);
        setPrevPage(data.previous);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`${BASE_URL}/api/products/delete/${deleteId}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
      } else {
        alert("Delete failed");
      }
    } catch {
      alert("Server error");
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => d * -1);
    else {
      setSortKey(key);
      setSortDir(1);
    }
  };

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  const filtered = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      const av = a[sortKey],
        bv = b[sortKey];
      if (typeof av === "string") return av.localeCompare(bv) * sortDir;
      return (Number(av) - Number(bv)) * sortDir;
    });

  const SortIcon = ({ k }) => (
    <span
      style={{
        marginLeft: "4px",
        fontSize: "10px",
        opacity: sortKey === k ? 1 : 0.3,
      }}
    >
      {sortKey === k ? (sortDir === 1 ? "▲" : "▼") : "↕"}
    </span>
  );

  const thStyle = (k) => ({
    ...s.th,
    color: sortKey === k ? "#111827" : "#9ca3af",
    cursor: "pointer",
  });

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.topbar}>
        <div>
          <h2 style={s.title}>Manage products</h2>
          <p style={s.sub}>Click any column header to sort</p>
        </div>
      </div>

      {/* Toolbar */}
      <div style={s.toolbar}>
        <input
          style={s.search}
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span style={s.countLabel}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              <th style={{ ...s.th, width: "60px" }}>Image</th>
              <th style={thStyle("name")} onClick={() => handleSort("name")}>
                Name <SortIcon k="name" />
              </th>
              <th
                style={thStyle("category")}
                onClick={() => handleSort("category")}
              >
                Category <SortIcon k="category" />
              </th>
              <th style={thStyle("price")} onClick={() => handleSort("price")}>
                Price <SortIcon k="price" />
              </th>
              <th style={thStyle("stock")} onClick={() => handleSort("stock")}>
                Stock <SortIcon k="stock" />
              </th>
              <th style={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#9ca3af",
                    fontSize: "13px",
                  }}
                >
                  No products found
                </td>
              </tr>
            ) : (
              filtered.map((p) => {
                const imgUrl = getImageUrl(p.image);
                const lowStock = p.stock < 10;
                return (
                  <tr key={p.id} style={s.tr}>
                    <td style={s.td}>
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={p.name}
                          style={s.img}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div style={s.imgPlaceholder}>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <rect
                              x="1"
                              y="3"
                              width="16"
                              height="12"
                              rx="3"
                              stroke="#d1d5db"
                              strokeWidth="1.2"
                            />
                            <circle
                              cx="9"
                              cy="9"
                              r="3"
                              stroke="#d1d5db"
                              strokeWidth="1.2"
                            />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td style={{ ...s.td, fontWeight: 500, color: "#111827" }}>
                      {p.name}
                    </td>
                    <td style={s.td}>
                      <span style={s.catPill}>{p.category}</span>
                    </td>
                    <td style={{ ...s.td, fontWeight: 500 }}>
                      Rs {Number(p.price).toLocaleString()}
                    </td>
                    <td
                      style={{
                        ...s.td,
                        fontWeight: 500,
                        color: lowStock ? "#A32D2D" : "#111827",
                      }}
                    >
                      {p.stock}
                      {lowStock && (
                        <span
                          style={{
                            marginLeft: "6px",
                            fontSize: "10px",
                            background: "#FCEBEB",
                            color: "#A32D2D",
                            padding: "1px 6px",
                            borderRadius: "20px",
                          }}
                        >
                          Low
                        </span>
                      )}
                    </td>
                    <td style={s.td}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => navigate(`/edit-product/${p.id}`)}
                          style={s.editBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          style={s.delBtn}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {(prevPage || nextPage) && (
        <div style={s.pagination}>
          {prevPage && (
            <button onClick={() => fetchProducts(prevPage)} style={s.pgBtn}>
              ← Prev
            </button>
          )}
          {nextPage && (
            <button onClick={() => fetchProducts(nextPage)} style={s.pgBtn}>
              Next →
            </button>
          )}
        </div>
      )}

      {/* Delete modal */}
      {deleteId && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div
              style={{
                width: "44px",
                height: "44px",
                background: "#FCEBEB",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L18 16H2L10 2Z"
                  stroke="#E24B4A"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <line
                  x1="10"
                  y1="8"
                  x2="10"
                  y2="12"
                  stroke="#E24B4A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="14.5" r="0.75" fill="#E24B4A" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Delete product?
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "20px",
              }}
            >
              This action cannot be undone. The product will be permanently
              removed.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setDeleteId(null)} style={s.cancelBtn}>
                Cancel
              </button>
              <button onClick={confirmDelete} style={s.confirmBtn}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  page: {
    padding: "24px",
    background: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    fontSize: "20px",
    fontWeight: 500,
    color: "#111827",
    margin: 0,
    marginBottom: "3px",
  },
  sub: { fontSize: "13px", color: "#9ca3af", margin: 0 },

  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  search: {
    padding: "8px 14px",
    border: "0.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "13px",
    outline: "none",
    fontFamily: "inherit",
    width: "260px",
    background: "white",
  },
  countLabel: { fontSize: "12px", color: "#9ca3af", marginLeft: "auto" },

  tableWrap: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#f9fafb", borderBottom: "0.5px solid #e5e7eb" },
  th: {
    padding: "11px 16px",
    fontSize: "11px",
    fontWeight: 500,
    color: "#9ca3af",
    textAlign: "left",
    whiteSpace: "nowrap",
    userSelect: "none",
  },
  tr: { borderBottom: "0.5px solid #f3f4f6" },
  td: {
    padding: "12px 16px",
    fontSize: "13px",
    color: "#374151",
    verticalAlign: "middle",
  },

  img: {
    width: "44px",
    height: "44px",
    objectFit: "contain",
    borderRadius: "6px",
    background: "#f9fafb",
  },
  imgPlaceholder: {
    width: "44px",
    height: "44px",
    background: "#f3f4f6",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  catPill: {
    fontSize: "10px",
    background: "#f3f4f6",
    color: "#6b7280",
    padding: "2px 8px",
    borderRadius: "20px",
    display: "inline-block",
  },

  editBtn: {
    padding: "5px 12px",
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 500,
    color: "#374151",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  delBtn: {
    padding: "5px 12px",
    background: "white",
    border: "0.5px solid #fca5a5",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 500,
    color: "#A32D2D",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  pagination: {
    display: "flex",
    gap: "6px",
    marginTop: "14px",
    justifyContent: "flex-end",
  },
  pgBtn: {
    padding: "6px 14px",
    borderRadius: "7px",
    border: "0.5px solid #e5e7eb",
    background: "white",
    fontSize: "12px",
    color: "#374151",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: "28px 24px",
    borderRadius: "14px",
    width: "320px",
    textAlign: "center",
  },
  cancelBtn: {
    flex: 1,
    padding: "9px",
    border: "0.5px solid #e5e7eb",
    borderRadius: "8px",
    background: "white",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
    color: "#374151",
  },
  confirmBtn: {
    flex: 1,
    padding: "9px",
    border: "none",
    borderRadius: "8px",
    background: "#E24B4A",
    color: "white",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default ManageProducts;
