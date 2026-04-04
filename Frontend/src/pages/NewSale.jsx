import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewSale() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerName, setCustomerName] = useState("");
  const [cashReceived, setCashReceived] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data.results || []));
  }, []);

  // ✅ ADD TO CART
  const addToCart = (product) => {
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      setCart(
        cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i)),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ✅ CHANGE QUANTITY
  const changeQty = (id, delta) => {
    setCart(
      cart
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  // ✅ REMOVE FROM CART
  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  // ✅ CALCULATE TOTAL
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // ✅ CALCULATE CHANGE
  const change = cashReceived ? Math.max(0, Number(cashReceived) - total) : 0;

  // ✅ CONFIRM SALE
  const handleConfirmSale = async () => {
    if (cart.length === 0) {
      alert("Please add at least one product");
      return;
    }

    setLoading(true);

    const saleData = {
      customer_name: customerName || "Walk-in",
      payment_method: paymentMethod,
      status: "completed",
      total_amount: total,
      items: cart.map((i) => ({
        product: i.id,
        quantity: i.qty,
        price: i.price,
      })),
    };

    console.log("📤 SENDING SALE:", saleData);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/sales/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      });

      const data = await res.json();
      console.log("✅ SALE RESPONSE:", data);

      if (res.ok) {
        alert("✅ Sale confirmed successfully!");
        // ✅ GO TO RECEIPT PAGE
        navigate(`/sale-receipt/${data.id}`);
      } else {
        alert("❌ Sale failed: " + JSON.stringify(data));
      }
    } catch (err) {
      alert("❌ Network error");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "20px",
          fontWeight: "600",
          color: "#1e293b",
        }}
      >
        New Sale
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: "20px",
        }}
      >
        {/* LEFT — PRODUCTS */}
        <div style={card}>
          <h3 style={cardHead}>Select Products</h3>
          <div
            style={{
              padding: "12px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {products.map((p) => (
              <div key={p.id} style={productCard}>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "2px",
                  }}
                >
                  {p.name}
                </p>
                <p
                  style={{
                    color: "#666",
                    fontSize: "12px",
                    marginBottom: "6px",
                  }}
                >
                  {p.category}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: p.stock < 10 ? "red" : "#888",
                    marginBottom: "8px",
                  }}
                >
                  Stock: {p.stock}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#1d4ed8",
                      fontWeight: "600",
                      fontSize: "13px",
                    }}
                  >
                    Rs {p.price}
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    disabled={p.stock === 0}
                    style={{
                      ...addBtn,
                      background: p.stock === 0 ? "#ccc" : "#1e293b",
                      cursor: p.stock === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — BILL */}
        <div style={{ ...card, alignSelf: "start" }}>
          <h3 style={cardHead}>Bill</h3>
          <div style={{ padding: "14px" }}>
            {/* CUSTOMER NAME */}
            <input
              placeholder="Customer name (optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={inputStyle}
            />

            {/* CART ITEMS */}
            {cart.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#aaa",
                  padding: "20px 0",
                  fontSize: "13px",
                }}
              >
                No items added yet
              </p>
            ) : (
              cart.map((item) => (
                <div key={item.id} style={billRow}>
                  <span style={{ fontSize: "13px", flex: 1 }}>{item.name}</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      style={qtyBtn}
                    >
                      -
                    </button>
                    <span
                      style={{
                        fontSize: "13px",
                        minWidth: "16px",
                        textAlign: "center",
                      }}
                    >
                      {item.qty}
                    </span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      style={qtyBtn}
                    >
                      +
                    </button>
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      minWidth: "70px",
                      textAlign: "right",
                    }}
                  >
                    Rs {item.price * item.qty}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={removeBtn}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}

            {/* TOTAL */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "700",
                fontSize: "15px",
                padding: "12px 0 8px",
                borderTop: "1px solid #eee",
                marginTop: "8px",
              }}
            >
              <span>Total</span>
              <span style={{ color: "#1d4ed8" }}>Rs {total}</span>
            </div>

            {/* PAYMENT METHOD */}
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
              Payment Method
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <button
                onClick={() => setPaymentMethod("cash")}
                style={{
                  ...methodBtn,
                  background: paymentMethod === "cash" ? "#1e293b" : "white",
                  color: paymentMethod === "cash" ? "white" : "#333",
                }}
              >
                Cash
              </button>
              <button
                onClick={() => setPaymentMethod("khalti")}
                style={{
                  ...methodBtn,
                  background: paymentMethod === "khalti" ? "#5c2d91" : "white",
                  color: paymentMethod === "khalti" ? "white" : "#5c2d91",
                  borderColor: "#5c2d91",
                }}
              >
                Khalti
              </button>
            </div>

            {/* CASH SECTION */}
            {paymentMethod === "cash" && (
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="number"
                  placeholder="Cash received (Rs)"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  style={inputStyle}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    color: "#555",
                  }}
                >
                  <span>Change</span>
                  <span style={{ color: "#15803d", fontWeight: "600" }}>
                    Rs {change}
                  </span>
                </div>
              </div>
            )}

            {/* KHALTI SECTION */}
            {paymentMethod === "khalti" && (
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="text"
                  placeholder="Customer Khalti number"
                  style={inputStyle}
                />
                <p style={{ fontSize: "11px", color: "#888" }}>
                  Payment request will be sent to customer's Khalti
                </p>
              </div>
            )}

            {/* CONFIRM BUTTON */}
            <button
              onClick={handleConfirmSale}
              disabled={loading}
              style={{
                ...confirmBtn,
                background: loading
                  ? "#aaa"
                  : paymentMethod === "khalti"
                    ? "#5c2d91"
                    : "#15803d",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading
                ? "Processing..."
                : paymentMethod === "khalti"
                  ? "Pay via Khalti"
                  : "Confirm Cash Sale"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const card = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  overflow: "hidden",
};

const cardHead = {
  padding: "12px 16px",
  background: "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "14px",
  fontWeight: "600",
  color: "#1e293b",
  margin: 0,
};

const productCard = {
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "10px",
};

const addBtn = {
  background: "#1e293b",
  color: "white",
  border: "none",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "13px",
  marginBottom: "12px",
  boxSizing: "border-box",
};

const billRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "7px 0",
  borderBottom: "1px solid #f1f5f9",
  gap: "8px",
};

const qtyBtn = {
  width: "24px",
  height: "24px",
  border: "1px solid #ddd",
  background: "#f8fafc",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const removeBtn = {
  background: "transparent",
  border: "none",
  color: "#dc2626",
  cursor: "pointer",
  fontSize: "13px",
};

const methodBtn = {
  padding: "9px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "13px",
  cursor: "pointer",
};

const confirmBtn = {
  width: "100%",
  padding: "11px",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "600",
  color: "white",
};

export default NewSale;
