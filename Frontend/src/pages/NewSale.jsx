// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function NewSale() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [customerName, setCustomerName] = useState("");
//   const [cashReceived, setCashReceived] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // ✅ FETCH PRODUCTS
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/products/")
//       .then((res) => res.json())
//       .then((data) => setProducts(data.results || []));
//   }, []);

//   // ✅ ADD TO CART
//   const addToCart = (product) => {
//     const existing = cart.find((i) => i.id === product.id);
//     if (existing) {
//       setCart(
//         cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i)),
//       );
//     } else {
//       setCart([...cart, { ...product, qty: 1 }]);
//     }
//   };

//   // ✅ CHANGE QUANTITY
//   const changeQty = (id, delta) => {
//     setCart(
//       cart
//         .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
//         .filter((i) => i.qty > 0),
//     );
//   };

//   // ✅ REMOVE FROM CART
//   const removeFromCart = (id) => {
//     setCart(cart.filter((i) => i.id !== id));
//   };

//   // ✅ CALCULATE TOTAL
//   const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

//   // ✅ CALCULATE CHANGE
//   const change = cashReceived ? Math.max(0, Number(cashReceived) - total) : 0;

//   // ✅ CONFIRM SALE
//   const handleConfirmSale = async () => {
//     if (cart.length === 0) {
//       alert("Please add at least one product");
//       return;
//     }

//     setLoading(true);

//     const saleData = {
//       customer_name: customerName || "Walk-in",
//       payment_method: paymentMethod,
//       status: "completed",
//       total_amount: total,
//       items: cart.map((i) => ({
//         product: i.id,
//         quantity: i.qty,
//         price: i.price,
//       })),
//     };

//     console.log("📤 SENDING SALE:", saleData);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/sales/create/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(saleData),
//       });

//       const data = await res.json();
//       console.log("✅ SALE RESPONSE:", data);

//       if (res.ok) {
//         alert("✅ Sale confirmed successfully!");
//         // ✅ GO TO RECEIPT PAGE
//         navigate(`/sale-receipt/${data.id}`);
//       } else {
//         alert("❌ Sale failed: " + JSON.stringify(data));
//       }
//     } catch (err) {
//       alert("❌ Network error");
//       console.error(err);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h2
//         style={{
//           marginBottom: "20px",
//           fontSize: "20px",
//           fontWeight: "600",
//           color: "#1e293b",
//         }}
//       >
//         New Sale
//       </h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 360px",
//           gap: "20px",
//         }}
//       >
//         {/* LEFT — PRODUCTS */}
//         <div style={card}>
//           <h3 style={cardHead}>Select Products</h3>
//           <div
//             style={{
//               padding: "12px",
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "10px",
//             }}
//           >
//             {products.map((p) => (
//               <div key={p.id} style={productCard}>
//                 <p
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "14px",
//                     marginBottom: "2px",
//                   }}
//                 >
//                   {p.name}
//                 </p>
//                 <p
//                   style={{
//                     color: "#666",
//                     fontSize: "12px",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   {p.category}
//                 </p>
//                 <p
//                   style={{
//                     fontSize: "11px",
//                     color: p.stock < 10 ? "red" : "#888",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   Stock: {p.stock}
//                 </p>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <span
//                     style={{
//                       color: "#1d4ed8",
//                       fontWeight: "600",
//                       fontSize: "13px",
//                     }}
//                   >
//                     Rs {p.price}
//                   </span>
//                   <button
//                     onClick={() => addToCart(p)}
//                     disabled={p.stock === 0}
//                     style={{
//                       ...addBtn,
//                       background: p.stock === 0 ? "#ccc" : "#1e293b",
//                       cursor: p.stock === 0 ? "not-allowed" : "pointer",
//                     }}
//                   >
//                     + Add
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT — BILL */}
//         <div style={{ ...card, alignSelf: "start" }}>
//           <h3 style={cardHead}>Bill</h3>
//           <div style={{ padding: "14px" }}>
//             {/* CUSTOMER NAME */}
//             <input
//               placeholder="Customer name (optional)"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               style={inputStyle}
//             />

//             {/* CART ITEMS */}
//             {cart.length === 0 ? (
//               <p
//                 style={{
//                   textAlign: "center",
//                   color: "#aaa",
//                   padding: "20px 0",
//                   fontSize: "13px",
//                 }}
//               >
//                 No items added yet
//               </p>
//             ) : (
//               cart.map((item) => (
//                 <div key={item.id} style={billRow}>
//                   <span style={{ fontSize: "13px", flex: 1 }}>{item.name}</span>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "6px",
//                     }}
//                   >
//                     <button
//                       onClick={() => changeQty(item.id, -1)}
//                       style={qtyBtn}
//                     >
//                       -
//                     </button>
//                     <span
//                       style={{
//                         fontSize: "13px",
//                         minWidth: "16px",
//                         textAlign: "center",
//                       }}
//                     >
//                       {item.qty}
//                     </span>
//                     <button
//                       onClick={() => changeQty(item.id, 1)}
//                       style={qtyBtn}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <span
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: "600",
//                       minWidth: "70px",
//                       textAlign: "right",
//                     }}
//                   >
//                     Rs {item.price * item.qty}
//                   </span>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     style={removeBtn}
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))
//             )}

//             {/* TOTAL */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 fontWeight: "700",
//                 fontSize: "15px",
//                 padding: "12px 0 8px",
//                 borderTop: "1px solid #eee",
//                 marginTop: "8px",
//               }}
//             >
//               <span>Total</span>
//               <span style={{ color: "#1d4ed8" }}>Rs {total}</span>
//             </div>

//             {/* PAYMENT METHOD */}
//             <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
//               Payment Method
//             </p>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "8px",
//                 marginBottom: "12px",
//               }}
//             >
//               <button
//                 onClick={() => setPaymentMethod("cash")}
//                 style={{
//                   ...methodBtn,
//                   background: paymentMethod === "cash" ? "#1e293b" : "white",
//                   color: paymentMethod === "cash" ? "white" : "#333",
//                 }}
//               >
//                 Cash
//               </button>
//               <button
//                 onClick={() => setPaymentMethod("khalti")}
//                 style={{
//                   ...methodBtn,
//                   background: paymentMethod === "khalti" ? "#5c2d91" : "white",
//                   color: paymentMethod === "khalti" ? "white" : "#5c2d91",
//                   borderColor: "#5c2d91",
//                 }}
//               >
//                 Khalti
//               </button>
//             </div>

//             {/* CASH SECTION */}
//             {paymentMethod === "cash" && (
//               <div style={{ marginBottom: "12px" }}>
//                 <input
//                   type="number"
//                   placeholder="Cash received (Rs)"
//                   value={cashReceived}
//                   onChange={(e) => setCashReceived(e.target.value)}
//                   style={inputStyle}
//                 />
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: "13px",
//                     color: "#555",
//                   }}
//                 >
//                   <span>Change</span>
//                   <span style={{ color: "#15803d", fontWeight: "600" }}>
//                     Rs {change}
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* KHALTI SECTION */}
//             {paymentMethod === "khalti" && (
//               <div style={{ marginBottom: "12px" }}>
//                 <input
//                   type="text"
//                   placeholder="Customer Khalti number"
//                   style={inputStyle}
//                 />
//                 <p style={{ fontSize: "11px", color: "#888" }}>
//                   Payment request will be sent to customer's Khalti
//                 </p>
//               </div>
//             )}

//             {/* CONFIRM BUTTON */}
//             <button
//               onClick={handleConfirmSale}
//               disabled={loading}
//               style={{
//                 ...confirmBtn,
//                 background: loading
//                   ? "#aaa"
//                   : paymentMethod === "khalti"
//                     ? "#5c2d91"
//                     : "#15803d",
//                 cursor: loading ? "not-allowed" : "pointer",
//               }}
//             >
//               {loading
//                 ? "Processing..."
//                 : paymentMethod === "khalti"
//                   ? "Pay via Khalti"
//                   : "Confirm Cash Sale"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* 🎨 STYLES */
// const card = {
//   background: "white",
//   border: "1px solid #e2e8f0",
//   borderRadius: "10px",
//   overflow: "hidden",
// };

// const cardHead = {
//   padding: "12px 16px",
//   background: "#f8fafc",
//   borderBottom: "1px solid #e2e8f0",
//   fontSize: "14px",
//   fontWeight: "600",
//   color: "#1e293b",
//   margin: 0,
// };

// const productCard = {
//   border: "1px solid #e2e8f0",
//   borderRadius: "8px",
//   padding: "10px",
// };

// const addBtn = {
//   background: "#1e293b",
//   color: "white",
//   border: "none",
//   padding: "4px 10px",
//   borderRadius: "6px",
//   fontSize: "12px",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "8px 10px",
//   border: "1px solid #ddd",
//   borderRadius: "6px",
//   fontSize: "13px",
//   marginBottom: "12px",
//   boxSizing: "border-box",
// };

// const billRow = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "7px 0",
//   borderBottom: "1px solid #f1f5f9",
//   gap: "8px",
// };

// const qtyBtn = {
//   width: "24px",
//   height: "24px",
//   border: "1px solid #ddd",
//   background: "#f8fafc",
//   borderRadius: "4px",
//   cursor: "pointer",
//   fontSize: "14px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const removeBtn = {
//   background: "transparent",
//   border: "none",
//   color: "#dc2626",
//   cursor: "pointer",
//   fontSize: "13px",
// };

// const methodBtn = {
//   padding: "9px",
//   border: "1px solid #ddd",
//   borderRadius: "6px",
//   fontSize: "13px",
//   cursor: "pointer",
// };

// const confirmBtn = {
//   width: "100%",
//   padding: "11px",
//   border: "none",
//   borderRadius: "6px",
//   fontSize: "14px",
//   fontWeight: "600",
//   color: "white",
// };

// export default NewSale;

// import { useEffect, useState } from "react";

// function NewSale() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [search, setSearch] = useState("");
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/sales/products/")
//       .then((res) => res.json())
//       .then((data) => setProducts(data.results || []));
//   }, []);

//   const filtered = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase()),
//   );

//   const addToCart = (product) => {
//     if (product.stock === 0) return;
//     const existing = cart.find((i) => i.id === product.id);
//     if (existing) {
//       if (existing.qty >= product.stock) return;
//       setCart(
//         cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i)),
//       );
//     } else {
//       setCart([...cart, { ...product, qty: 1 }]);
//     }
//   };

//   const changeQty = (id, delta) => {
//     const product = products.find((p) => p.id === id);
//     setCart(
//       cart
//         .map((i) => {
//           if (i.id !== id) return i;
//           const newQty = i.qty + delta;
//           if (newQty > product.stock) return i;
//           return { ...i, qty: newQty };
//         })
//         .filter((i) => i.qty > 0),
//     );
//   };

//   const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));

//   const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

//   const inCart = (id) => cart.find((i) => i.id === id);

//   const handleSale = async () => {
//     if (cart.length === 0) {
//       alert("Add products first");
//       return;
//     }
//    // ✅ FIXED BODY FORMAT
//         body: JSON.stringify({
//           customer_name: "Walk-in",
//           payment_method: "cash",
//           items: cart.map((i) => ({
//             product: i.id,
//             quantity: i.qty,
//           })),
//         }),
//       });
//       if (!res.ok) throw new Error();
//       alert("Sale recorded successfully!");
//       setCart([]);
//       // Refresh stock values
//       fetch("http://127.0.0.1:8000/api/products/")
//         .then((r) => r.json())
//         .then((d) => setProducts(d.results || []));
//     } catch {
//       alert("Failed to save sale. Check your backend.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "24px",
//         background: "var(--color-background-tertiary, #f5f5f3)",
//         minHeight: "100vh",
//       }}
//     >
//       <h2 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "4px" }}>
//         Record Sale
//       </h2>
//       <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
//         Select products and quantities to record a sale
//       </p>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 320px",
//           gap: "20px",
//           alignItems: "start",
//         }}
//       >
//         {/* LEFT — PRODUCT GRID */}
//         <div>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "9px 14px",
//               marginBottom: "14px",
//               border: "0.5px solid #d1d5db",
//               borderRadius: "8px",
//               fontSize: "13px",
//               background: "white",
//               outline: "none",
//             }}
//           />

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "12px",
//             }}
//           >
//             {filtered.map((p) => {
//               const cartItem = inCart(p.id);
//               const outOfStock = p.stock === 0;
//               return (
//                 <div
//                   key={p.id}
//                   style={{
//                     background: "white",
//                     border: cartItem
//                       ? "1.5px solid #1D9E75"
//                       : "0.5px solid #e5e7eb",
//                     borderRadius: "12px",
//                     padding: "14px",
//                     opacity: outOfStock ? 0.55 : 1,
//                     transition: "border 0.2s",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       marginBottom: "6px",
//                     }}
//                   >
//                     <p
//                       style={{
//                         fontWeight: 500,
//                         fontSize: "14px",
//                         color: "#111",
//                       }}
//                     >
//                       {p.name}
//                     </p>
//                     {cartItem && (
//                       <span
//                         style={{
//                           background: "#E1F5EE",
//                           color: "#0F6E56",
//                           fontSize: "11px",
//                           padding: "2px 8px",
//                           borderRadius: "20px",
//                           fontWeight: 500,
//                         }}
//                       >
//                         In cart
//                       </span>
//                     )}
//                   </div>
//                   <p
//                     style={{
//                       fontSize: "12px",
//                       color: "#9ca3af",
//                       marginBottom: "2px",
//                     }}
//                   >
//                     {p.category}
//                   </p>
//                   <p
//                     style={{
//                       fontSize: "12px",
//                       color: outOfStock ? "#ef4444" : "#6b7280",
//                       marginBottom: "6px",
//                     }}
//                   >
//                     Stock: {p.stock} {outOfStock && "— Out of stock"}
//                   </p>
//                   <p
//                     style={{
//                       color: "#1e40af",
//                       fontWeight: 600,
//                       fontSize: "15px",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     Rs {Number(p.price).toLocaleString()}
//                   </p>

//                   {cartItem ? (
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "8px",
//                       }}
//                     >
//                       <button
//                         onClick={() => changeQty(p.id, -1)}
//                         style={qtyBtn}
//                       >
//                         −
//                       </button>
//                       <span
//                         style={{
//                           fontSize: "14px",
//                           fontWeight: 500,
//                           minWidth: "20px",
//                           textAlign: "center",
//                         }}
//                       >
//                         {cartItem.qty}
//                       </span>
//                       <button
//                         onClick={() => changeQty(p.id, 1)}
//                         style={qtyBtn}
//                         disabled={cartItem.qty >= p.stock}
//                       >
//                         +
//                       </button>
//                       <button
//                         onClick={() => removeFromCart(p.id)}
//                         style={{
//                           ...qtyBtn,
//                           marginLeft: "auto",
//                           color: "#ef4444",
//                           borderColor: "#fca5a5",
//                         }}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => addToCart(p)}
//                       disabled={outOfStock}
//                       style={{
//                         width: "100%",
//                         padding: "7px",
//                         background: outOfStock ? "#e5e7eb" : "#1e293b",
//                         color: outOfStock ? "#9ca3af" : "white",
//                         border: "none",
//                         borderRadius: "6px",
//                         fontSize: "13px",
//                         cursor: outOfStock ? "not-allowed" : "pointer",
//                         fontWeight: 500,
//                       }}
//                     >
//                       + Add
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* RIGHT — CART */}
//         <div
//           style={{
//             background: "white",
//             border: "0.5px solid #e5e7eb",
//             borderRadius: "12px",
//             padding: "18px",
//             position: "sticky",
//             top: "20px",
//           }}
//         >
//           <h3
//             style={{ fontSize: "15px", fontWeight: 500, marginBottom: "14px" }}
//           >
//             Selected Items{" "}
//             {cart.length > 0 && (
//               <span
//                 style={{
//                   background: "#f3f4f6",
//                   color: "#374151",
//                   fontSize: "12px",
//                   padding: "2px 8px",
//                   borderRadius: "20px",
//                   marginLeft: "6px",
//                 }}
//               >
//                 {cart.length}
//               </span>
//             )}
//           </h3>

//           {cart.length === 0 ? (
//             <div
//               style={{
//                 textAlign: "center",
//                 padding: "30px 0",
//                 color: "#9ca3af",
//               }}
//             >
//               <p style={{ fontSize: "13px" }}>No items selected</p>
//               <p style={{ fontSize: "12px", marginTop: "4px" }}>
//                 Click + Add on any product
//               </p>
//             </div>
//           ) : (
//             <div>
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "12px",
//                     paddingBottom: "12px",
//                     borderBottom: "0.5px solid #f3f4f6",
//                   }}
//                 >
//                   <div>
//                     <p
//                       style={{
//                         fontSize: "13px",
//                         fontWeight: 500,
//                         color: "#111",
//                       }}
//                     >
//                       {item.name}
//                     </p>
//                     <p style={{ fontSize: "12px", color: "#9ca3af" }}>
//                       Rs {Number(item.price).toLocaleString()} × {item.qty}
//                     </p>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "6px",
//                     }}
//                   >
//                     <p
//                       style={{
//                         fontSize: "13px",
//                         fontWeight: 500,
//                         color: "#1e40af",
//                       }}
//                     >
//                       Rs {Number(item.price * item.qty).toLocaleString()}
//                     </p>
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       style={{
//                         background: "none",
//                         border: "none",
//                         color: "#d1d5db",
//                         cursor: "pointer",
//                         fontSize: "14px",
//                         padding: "2px",
//                       }}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div
//             style={{
//               borderTop: "0.5px solid #e5e7eb",
//               paddingTop: "14px",
//               marginTop: "4px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginBottom: "14px",
//               }}
//             >
//               <span style={{ fontSize: "14px", color: "#6b7280" }}>Total</span>
//               <span
//                 style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}
//               >
//                 Rs {Number(total).toLocaleString()}
//               </span>
//             </div>
//             <button
//               onClick={handleSale}
//               disabled={cart.length === 0 || saving}
//               style={{
//                 width: "100%",
//                 padding: "11px",
//                 background: cart.length === 0 ? "#e5e7eb" : "#1D9E75",
//                 color: cart.length === 0 ? "#9ca3af" : "white",
//                 border: "none",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//                 cursor: cart.length === 0 ? "not-allowed" : "pointer",
//               }}
//             >
//               {saving ? "Saving..." : "Save Sale"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const qtyBtn = {
//   width: "28px",
//   height: "28px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   border: "0.5px solid #d1d5db",
//   borderRadius: "6px",
//   background: "white",
//   cursor: "pointer",
//   fontSize: "15px",
// };

// export default NewSale;

// import { useEffect, useState } from "react";

// function NewSale() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [search, setSearch] = useState("");
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     // ✅ FIXED PRODUCTS API
//     fetch("http://127.0.0.1:8000/api/products/")
//       .then((res) => res.json())
//       .then((data) => setProducts(data.results || []));
//   }, []);

//   const filtered = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase()),
//   );

//   const addToCart = (product) => {
//     if (product.stock === 0) return;
//     const existing = cart.find((i) => i.id === product.id);
//     if (existing) {
//       if (existing.qty >= product.stock) return;
//       setCart(
//         cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i)),
//       );
//     } else {
//       setCart([...cart, { ...product, qty: 1 }]);
//     }
//   };

//   const changeQty = (id, delta) => {
//     const product = products.find((p) => p.id === id);
//     setCart(
//       cart
//         .map((i) => {
//           if (i.id !== id) return i;
//           const newQty = i.qty + delta;
//           if (newQty > product.stock) return i;
//           return { ...i, qty: newQty };
//         })
//         .filter((i) => i.qty > 0),
//     );
//   };

//   const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));

//   const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

//   const inCart = (id) => cart.find((i) => i.id === id);

//   const handleSale = async () => {
//     if (cart.length === 0) {
//       alert("Add products first");
//       return;
//     }
//     setSaving(true);
//     try {
//       // ✅ FIXED SALE API
//       const res = await fetch("http://127.0.0.1:8000/api/sales/create/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },

//   // ✅ FIXED BODY FORMAT
//   body: JSON.stringify({
//     customer_name: "Walk-in",
//     payment_method: "cash",
//     items: cart.map((i) => ({
//       product: i.id,
//       quantity: i.qty,
//     })),
//   }),
// });

//       const data = await res.json();
//       console.log("RESPONSE:", data);

//       if (!res.ok) {
//         throw new Error(JSON.stringify(data));
//       }

//       alert("Sale recorded successfully!");
//       setCart([]);

//       // Refresh stock values
//       fetch("http://127.0.0.1:8000/api/products/")
//         .then((r) => r.json())
//         .then((d) => setProducts(d.results || []));
//     } catch (err) {
//       // ✅ BETTER ERROR
//       console.error(err);
//       alert("Error: " + err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "24px",
//         background: "var(--color-background-tertiary, #f5f5f3)",
//         minHeight: "100vh",
//       }}
//     >
//       <h2 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "4px" }}>
//         Record Sale
//       </h2>
//       <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
//         Select products and quantities to record a sale
//       </p>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 320px",
//           gap: "20px",
//           alignItems: "start",
//         }}
//       >
//         {/* LEFT — PRODUCT GRID */}
//         <div>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "9px 14px",
//               marginBottom: "14px",
//               border: "0.5px solid #d1d5db",
//               borderRadius: "8px",
//               fontSize: "13px",
//               background: "white",
//               outline: "none",
//             }}
//           />

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "12px",
//             }}
//           >
//             {filtered.map((p) => {
//               const cartItem = inCart(p.id);
//               const outOfStock = p.stock === 0;
//               return (
//                 <div
//                   key={p.id}
//                   style={{
//                     background: "white",
//                     border: cartItem
//                       ? "1.5px solid #1D9E75"
//                       : "0.5px solid #e5e7eb",
//                     borderRadius: "12px",
//                     padding: "14px",
//                     opacity: outOfStock ? 0.55 : 1,
//                     transition: "border 0.2s",
//                   }}
//                 >
//                   {/* UI SAME AS YOURS */}
//                   <p style={{ fontWeight: 500 }}>{p.name}</p>
//                   <p style={{ fontSize: "12px" }}>Stock: {p.stock}</p>
//                   <p style={{ fontWeight: 600 }}>
//                     Rs {Number(p.price).toLocaleString()}
//                   </p>

//                   {cartItem ? (
//                     <div style={{ display: "flex", gap: "8px" }}>
//                       <button onClick={() => changeQty(p.id, -1)}>−</button>
//                       <span>{cartItem.qty}</span>
//                       <button onClick={() => changeQty(p.id, 1)}>+</button>
//                       <button onClick={() => removeFromCart(p.id)}>✕</button>
//                     </div>
//                   ) : (
//                     <button onClick={() => addToCart(p)}>+ Add</button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* RIGHT — CART */}
//         <div>
//           <h3>Selected Items ({cart.length})</h3>

//           {cart.map((item) => (
//             <div key={item.id}>
//               {item.name} × {item.qty}
//             </div>
//           ))}

//           <h4>Total: Rs {total}</h4>

//           <button onClick={handleSale}>
//             {saving ? "Saving..." : "Save Sale"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewSale;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewSale() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data.results || []));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addToCart = (product) => {
    if (product.stock === 0) return;
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      if (existing.qty >= product.stock) return;
      setCart(
        cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i)),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const changeQty = (id, delta) => {
    const product = products.find((p) => p.id === id);
    setCart(
      cart
        .map((i) => {
          if (i.id !== id) return i;
          const newQty = i.qty + delta;
          if (newQty > product.stock) return i;
          return { ...i, qty: newQty };
        })
        .filter((i) => i.qty > 0),
    );
  };

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const inCart = (id) => cart.find((i) => i.id === id);

  const handleSale = async () => {
    if (cart.length === 0) {
      alert("Add products first");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/sales/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: "Walk-in",
          payment_method: "cash",
          items: cart.map((i) => ({
            product: i.id,
            quantity: i.qty,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(JSON.stringify(data));
      }

      alert("Sale recorded successfully!");
      navigate(`/sale-receipt/${data.id}`); // Redirect to receipt page
      setCart([]);

      fetch("http://127.0.0.1:8000/api/products/")
        .then((r) => r.json())
        .then((d) => setProducts(d.results || []));
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        padding: "24px",
        background: "var(--color-background-tertiary, #f5f5f3)",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "4px" }}>
        Record Sale
      </h2>
      <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
        Select products and quantities to record a sale
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {/* LEFT — PRODUCTS */}
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 14px",
              marginBottom: "14px",
              border: "0.5px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "13px",
              background: "white",
              outline: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {filtered.map((p) => {
              const cartItem = inCart(p.id);
              const outOfStock = p.stock === 0;

              return (
                <div
                  key={p.id}
                  style={{
                    background: "white",
                    border: cartItem
                      ? "1.5px solid #1D9E75"
                      : "0.5px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "14px",
                    opacity: outOfStock ? 0.55 : 1,
                  }}
                >
                  <p style={{ fontWeight: 500 }}>{p.name}</p>
                  <p style={{ fontSize: "12px" }}>Stock: {p.stock}</p>
                  <p style={{ color: "#1e40af", fontWeight: 600 }}>
                    Rs {Number(p.price).toLocaleString()}
                  </p>

                  {cartItem ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => changeQty(p.id, -1)}>−</button>
                      <span>{cartItem.qty}</span>
                      <button onClick={() => changeQty(p.id, 1)}>+</button>
                      <button onClick={() => removeFromCart(p.id)}>✕</button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(p)}>+ Add</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — CART (FIXED UI) */}
        <div
          style={{
            background: "white",
            border: "0.5px solid #e5e7eb",
            borderRadius: "12px",
            padding: "18px",
            position: "sticky",
            top: "20px",
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>
            Selected Items ({cart.length})
          </h3>

          {cart.length === 0 ? (
            <p style={{ color: "#9ca3af" }}>No items selected</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ marginBottom: "10px" }}>
                {item.name} × {item.qty}
              </div>
            ))
          )}

          <hr />

          <h4>Total: Rs {total}</h4>

          <button
            onClick={handleSale}
            disabled={cart.length === 0 || saving}
            style={{
              width: "100%",
              padding: "10px",
              background: cart.length === 0 ? "#e5e7eb" : "#1D9E75",
              color: cart.length === 0 ? "#9ca3af" : "white",
              border: "none",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          >
            {saving ? "Saving..." : "Save Sale"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewSale;