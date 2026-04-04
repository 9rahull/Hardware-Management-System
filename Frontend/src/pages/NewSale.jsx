import { useEffect, useState } from "react";

function NewSale() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(data.results || []));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600" }}>
        New Sale
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px" }}>

        {/* LEFT — Products */}
        <div style={card}>
          <h3 style={cardHead}>Select Products</h3>
          <div style={{ padding: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {products.map(p => (
              <div key={p.id} style={productCard}>
                <p style={{ fontWeight: "600", fontSize: "14px" }}>{p.name}</p>
                <p style={{ color: "#666", fontSize: "12px", marginBottom: "8px" }}>{p.category}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#1d4ed8", fontWeight: "600" }}>Rs {p.price}</span>
                  <button onClick={() => addToCart(p)} style={addBtn}>+ Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Bill */}
        <div style={card}>
          <h3 style={cardHead}>Bill</h3>
          <div style={{ padding: "14px" }}>

            <input
              placeholder="Customer name (optional)"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              style={inputStyle}
            />

            {cart.length === 0 ? (
              <p style={{ textAlign: "center", color: "#aaa", padding: "20px 0", fontSize: "13px" }}>
                No items added
              </p>
            ) : (
              cart.map(item => (
                <div key={item.id} style={billRow}>
                  <span style={{ fontSize: "13px" }}>{item.name} x{item.qty}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600" }}>Rs {item.price * item.qty}</span>
                  <button onClick={() => removeFromCart(item.id)} style={removeBtn}>x</button>
                </div>
              ))
            )}

            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "15px", padding: "12px 0 8px", borderTop: "1px solid #eee", marginTop: "8px" }}>
              <span>Total</span>
              <span style={{ color: "#1d4ed8" }}>Rs {total}</span>
            </div>

            {/* Payment Method */}
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>Payment Method</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
              <button
                onClick={() => setPaymentMethod("cash")}
                style={{ ...methodBtn, background: paymentMethod === "cash" ? "#1e293b" : "white", color: paymentMethod === "cash" ? "white" : "#333" }}
              >
                Cash
              </button>
              <button
                onClick={() => setPaymentMethod("khalti")}
                style={{ ...methodBtn, background: paymentMethod === "khalti" ? "#5c2d91" : "white", color: paymentMethod === "khalti" ? "white" : "#5c2d91", borderColor: "#5c2d91" }}
              >
                Khalti
              </button>
            </div>

            <button
              style={{ ...confirmBtn, background: paymentMethod === "khalti" ? "#5c2d91" : "#15803d" }}
            >
              {paymentMethod === "khalti" ? "Pay via Khalti" : "Confirm Cash Sale"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const card = { background: "white", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" };
const cardHead = { padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "14px", fontWeight: "600", color: "#1e293b" };
const productCard = { border: "1px solid #e2e8f0", borderRadius: "8px", padding: "10px" };
const addBtn = { background: "#1e293b", color: "white", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" };
const inputStyle = { width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", marginBottom: "12px", boxSizing: "border-box" };
const billRow = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #f1f5f9", gap: "8px" };
const removeBtn = { background: "transparent", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "14px" };
const methodBtn = { padding: "9px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", cursor: "pointer" };
const confirmBtn = { width: "100%", padding: "11px", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", color: "white", cursor: "pointer" };

export default NewSale;