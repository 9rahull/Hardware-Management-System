import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SaleReceipt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH SALE
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/sales/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setSale(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading receipt...</p>;
  if (!sale) return <p style={{ padding: "20px" }}>Receipt not found</p>;

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      {/* BUTTONS — hidden when printing */}
      <div
        style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
        className="no-print"
      >
        <button onClick={handlePrint} style={printBtn}>
          Print Receipt
        </button>
        <button onClick={() => navigate("/new-sale")} style={backBtn}>
          New Sale
        </button>
        <button onClick={() => navigate("/sales-history")} style={backBtn}>
          Sales History
        </button>
      </div>

      {/* RECEIPT BOX */}
      <div style={receiptBox}>
        {/* HEADER */}
        <div style={receiptHeader}>
          <h2
            style={{ fontSize: "18px", fontWeight: "700", marginBottom: "4px" }}
          >
            Hardware Store
          </h2>
          <p style={{ fontSize: "12px", color: "#666" }}>Kathmandu, Nepal</p>
          <p style={{ fontSize: "12px", color: "#666" }}>Tel: 9800000000</p>
          <div style={divider} />
          <p style={{ fontSize: "13px", fontWeight: "600" }}>RECEIPT</p>
        </div>

        {/* SALE INFO */}
        <div style={{ marginBottom: "14px" }}>
          <div style={infoRow}>
            <span style={label}>Receipt No</span>
            <span style={value}># {sale.id}</span>
          </div>
          <div style={infoRow}>
            <span style={label}>Date</span>
            <span style={value}>
              {new Date(sale.created_at).toLocaleDateString("en-NP", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div style={infoRow}>
            <span style={label}>Time</span>
            <span style={value}>
              {new Date(sale.created_at).toLocaleTimeString("en-NP", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div style={infoRow}>
            <span style={label}>Customer</span>
            <span style={value}>{sale.customer_name || "Walk-in"}</span>
          </div>
          <div style={infoRow}>
            <span style={label}>Payment</span>
            <span
              style={{
                ...value,
                color: sale.payment_method === "khalti" ? "#5c2d91" : "#15803d",
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {sale.payment_method}
            </span>
          </div>
        </div>

        <div style={divider} />

        {/* ITEMS */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "14px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px dashed #ccc" }}>
              <th style={th}>Item</th>
              <th style={{ ...th, textAlign: "center" }}>Qty</th>
              <th style={{ ...th, textAlign: "right" }}>Price</th>
              <th style={{ ...th, textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {sale.items.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px dashed #eee" }}>
                <td style={td}>{item.product_name}</td>
                <td style={{ ...td, textAlign: "center" }}>{item.quantity}</td>
                <td style={{ ...td, textAlign: "right" }}>Rs {item.price}</td>
                <td style={{ ...td, textAlign: "right" }}>
                  Rs {item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={divider} />

        {/* TOTAL */}
        <div
          style={{
            ...infoRow,
            fontSize: "15px",
            fontWeight: "700",
            padding: "10px 0",
          }}
        >
          <span>Total Amount</span>
          <span style={{ color: "#1d4ed8" }}>Rs {sale.total_amount}</span>
        </div>

        <div style={divider} />

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: "14px" }}>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Thank you for your purchase!
          </p>
          <p style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>
            Please visit again
          </p>
        </div>
      </div>

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}

/* STYLES */
const receiptBox = {
  maxWidth: "360px",
  margin: "0 auto",
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "24px",
};

const receiptHeader = {
  textAlign: "center",
  marginBottom: "16px",
};

const divider = {
  borderTop: "1px dashed #ccc",
  margin: "12px 0",
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "4px 0",
  fontSize: "13px",
};

const label = {
  color: "#666",
};

const value = {
  color: "#1e293b",
  fontWeight: "500",
};

const th = {
  padding: "6px 4px",
  fontSize: "12px",
  color: "#666",
  textAlign: "left",
  fontWeight: "600",
};

const td = {
  padding: "7px 4px",
  fontSize: "13px",
  color: "#1e293b",
};

const printBtn = {
  background: "#1e293b",
  color: "white",
  border: "none",
  padding: "9px 18px",
  borderRadius: "6px",
  fontSize: "13px",
  cursor: "pointer",
};

const backBtn = {
  background: "white",
  color: "#1e293b",
  border: "1px solid #e2e8f0",
  padding: "9px 18px",
  borderRadius: "6px",
  fontSize: "13px",
  cursor: "pointer",
};

export default SaleReceipt;
