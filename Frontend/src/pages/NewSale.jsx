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
          items: cart.map((i) => ({ product: i.id, quantity: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      alert("Sale recorded successfully!");
      navigate(`/sale-receipt/${data.id}`);
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
    <div style={s.page}>
      <h2 style={s.title}>Record sale</h2>
      <p style={s.sub}>Select products and quantities to record a sale</p>

      <div style={s.layout}>

        {/* ── LEFT: PRODUCT GRID ── */}
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.search}
          />

          <div style={s.grid}>
            {filtered.map((p) => {
              const cartItem   = inCart(p.id);
              const outOfStock = p.stock === 0;

              return (
                <div
                  key={p.id}
                  style={{
                    ...s.pcard,
                    border: cartItem
                      ? "1.5px solid #1D9E75"
                      : "0.5px solid #e5e7eb",
                    opacity: outOfStock ? 0.5 : 1,
                  }}
                >
                  {cartItem && (
                    <span style={s.inBadge}>In cart</span>
                  )}

                  <p style={s.pname}>{p.name}</p>
                  <p style={{ ...s.pstock, color: outOfStock ? "#A32D2D" : "#9ca3af" }}>
                    {outOfStock ? "Out of stock" : `Stock: ${p.stock} units`}
                  </p>
                  <p style={s.pprice}>Rs {Number(p.price).toLocaleString()}</p>

                  {cartItem ? (
                    <div style={s.qtyRow}>
                      <button style={s.qtyBtn} onClick={() => changeQty(p.id, -1)}>−</button>
                      <span style={s.qtyNum}>{cartItem.qty}</span>
                      <button
                        style={s.qtyBtn}
                        onClick={() => changeQty(p.id, 1)}
                        disabled={cartItem.qty >= p.stock}
                      >
                        +
                      </button>
                      <button style={s.rmBtn} onClick={() => removeFromCart(p.id)}>✕</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(p)}
                      disabled={outOfStock}
                      style={{
                        ...s.addBtn,
                        background: outOfStock ? "#e5e7eb" : "#111827",
                        color: outOfStock ? "#9ca3af" : "white",
                        cursor: outOfStock ? "not-allowed" : "pointer",
                      }}
                    >
                      {outOfStock ? "Out of stock" : "+ Add"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: CART ── */}
        <div style={s.cart}>
          <div style={s.cartHeader}>
            <span style={s.cartTitle}>Selected items</span>
            {cart.length > 0 && (
              <span style={s.cartCount}>
                {cart.length} item{cart.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {cart.length === 0 ? (
            <div style={s.empty}>
              <p style={{ fontSize: "13px", marginBottom: "4px" }}>No items selected</p>
              <p style={{ fontSize: "12px" }}>Click + Add on any product</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={s.cartItem}>
                <div>
                  <p style={s.ciName}>{item.name}</p>
                  <p style={s.ciQty}>
                    Rs {Number(item.price).toLocaleString()} × {item.qty}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <p style={s.ciPrice}>
                    Rs {Number(item.price * item.qty).toLocaleString()}
                  </p>
                  <button style={s.ciRm} onClick={() => removeFromCart(item.id)}>
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}

          <hr style={s.divider} />

          <div style={s.totalRow}>
            <span style={s.totalLabel}>Total</span>
            <span style={s.totalVal}>Rs {Number(total).toLocaleString()}</span>
          </div>

          <button
            onClick={handleSale}
            disabled={cart.length === 0 || saving}
            style={{
              ...s.saveBtn,
              background: cart.length === 0 ? "#e5e7eb" : "#1D9E75",
              color: cart.length === 0 ? "#9ca3af" : "white",
              cursor: cart.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving..." : "Save sale"}
          </button>
        </div>

      </div>
    </div>
  );
}

const s = {
  page:    { padding: "24px", background: "#f9fafb", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" },
  title:   { fontSize: "20px", fontWeight: 500, color: "#111827", margin: 0, marginBottom: "3px" },
  sub:     { fontSize: "13px", color: "#9ca3af", margin: 0, marginBottom: "20px" },
  layout:  { display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px", alignItems: "start" },

  search: {
    width: "100%", padding: "10px 14px", marginBottom: "14px",
    border: "0.5px solid #e5e7eb", borderRadius: "10px",
    fontSize: "13px", background: "white", outline: "none",
    fontFamily: "inherit", color: "#111827", display: "block",
  },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },

  pcard:   { background: "white", borderRadius: "12px", padding: "16px" },
  inBadge: { display: "inline-block", fontSize: "10px", background: "#EAF3DE", color: "#3B6D11", padding: "2px 8px", borderRadius: "20px", fontWeight: 500, marginBottom: "6px" },
  pname:   { fontSize: "13px", fontWeight: 500, color: "#111827", margin: 0, marginBottom: "4px" },
  pstock:  { fontSize: "11px", margin: 0, marginBottom: "4px" },
  pprice:  { fontSize: "15px", fontWeight: 600, color: "#1e40af", margin: 0, marginBottom: "12px" },

  addBtn: { width: "100%", padding: "8px", border: "none", borderRadius: "7px", fontSize: "12px", fontWeight: 500, fontFamily: "inherit" },

  qtyRow: { display: "flex", alignItems: "center", gap: "6px" },
  qtyBtn: { width: "28px", height: "28px", border: "0.5px solid #e5e7eb", borderRadius: "6px", background: "white", cursor: "pointer", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" },
  qtyNum: { fontSize: "14px", fontWeight: 500, minWidth: "20px", textAlign: "center", color: "#111827" },
  rmBtn:  { marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#d1d5db", fontSize: "14px", padding: 0 },

  cart:       { background: "white", border: "0.5px solid #e5e7eb", borderRadius: "12px", padding: "18px", position: "sticky", top: "20px" },
  cartHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  cartTitle:  { fontSize: "14px", fontWeight: 500, color: "#111827" },
  cartCount:  { fontSize: "11px", background: "#f3f4f6", color: "#6b7280", padding: "2px 8px", borderRadius: "20px" },

  empty: { textAlign: "center", padding: "28px 0", color: "#9ca3af" },

  cartItem: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "0.5px solid #f3f4f6" },
  ciName:   { fontSize: "12px", fontWeight: 500, color: "#111827", margin: 0, marginBottom: "2px" },
  ciQty:    { fontSize: "11px", color: "#9ca3af", margin: 0 },
  ciPrice:  { fontSize: "12px", fontWeight: 500, color: "#1e40af", margin: 0 },
  ciRm:     { background: "none", border: "none", color: "#d1d5db", cursor: "pointer", fontSize: "13px", padding: 0 },

  divider:    { border: "none", borderTop: "0.5px solid #e5e7eb", margin: "14px 0" },
  totalRow:   { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  totalLabel: { fontSize: "13px", color: "#6b7280" },
  totalVal:   { fontSize: "18px", fontWeight: 600, color: "#111827" },
  saveBtn:    { width: "100%", padding: "11px", border: "none", borderRadius: "9px", fontSize: "14px", fontWeight: 500, fontFamily: "inherit" },
};

export default NewSale;
