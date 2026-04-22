import { useEffect, useState } from "react";

function VendorPayments() {
  const [payments, setPayments] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("payments"); // "payments" | "summary"

  // Form state
  const [vendorId, setVendorId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // ── Fetch all data ──────────────────────────────────────────────────────────
  const fetchAll = () => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/payment/").then((r) => r.json()),
      fetch("http://127.0.0.1:8000/api/vendors/").then((r) => r.json()),
      fetch("http://127.0.0.1:8000/api/payment/summary/").then((r) => r.json()),
    ])
      .then(([pay, ven, sum]) => {
        setPayments(pay);
        setVendors(ven);
        setSummary(sum);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load data. Is Django running?");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ── Add payment ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!vendorId) {
      setFormError("Please select a vendor.");
      return;
    }
    if (!amount || Number(amount) < 0) {
      setFormError("Amount cannot be negative.");
      return;
    }
    if (Number(amount) === 0) {
      setFormError("Amount must be greater than 0.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/payment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor: vendorId,
          amount: Number(amount),
          status,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(
          data.amount?.[0] || data.vendor?.[0] || "Failed to add payment.",
        );
        setSaving(false);
        return;
      }

      // Reset form
      setVendorId("");
      setAmount("");
      setStatus("pending");
      setNote("");
      fetchAll();
    } catch {
      setFormError("Server error. Please try again.");
    }

    setSaving(false);
  };

  // ── Delete payment ───────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment record?")) return;
    await fetch(`http://127.0.0.1:8000/api/payment/${id}/`, {
      method: "DELETE",
    });
    fetchAll();
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + Number(p.amount), 0);
  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((s, p) => s + Number(p.amount), 0);

  if (loading)
    return (
      <div style={s.page}>
        <p style={{ color: "#9ca3af" }}>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div style={s.page}>
        <p style={{ color: "#A32D2D" }}>{error}</p>
      </div>
    );

  return (
    <div style={s.page}>
      {/* ── HEADER ── */}
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Vendor Payments</h2>
          <p style={s.sub}>Track payments and dues for your vendors</p>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={s.statsRow}>
        <div style={s.stat}>
          <p style={s.statLabel}>Total payments</p>
          <p style={s.statVal}>{payments.length}</p>
        </div>
        <div style={s.stat}>
          <p style={s.statLabel}>Total paid</p>
          <p style={{ ...s.statVal, color: "#3B6D11" }}>
            Rs {totalPaid.toLocaleString()}
          </p>
        </div>
        <div style={s.stat}>
          <p style={s.statLabel}>Total pending</p>
          <p style={{ ...s.statVal, color: "#854F0B" }}>
            Rs {totalPending.toLocaleString()}
          </p>
        </div>
        <div style={s.stat}>
          <p style={s.statLabel}>Vendors</p>
          <p style={s.statVal}>{vendors.length}</p>
        </div>
      </div>

      <div style={s.layout}>
        {/* ── LEFT: ADD PAYMENT FORM ── */}
        <div style={s.formCard}>
          <p style={s.cardTitle}>Add new payment</p>

          {formError && <div style={s.formErr}>{formError}</div>}

          <form onSubmit={handleSubmit}>
            {/* VENDOR */}
            <div style={s.field}>
              <label style={s.label}>Vendor</label>
              <select
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                style={s.input}
                required
              >
                <option value="">Select vendor</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* AMOUNT */}
            <div style={s.field}>
              <label style={s.label}>Amount (Rs)</label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000"
                style={s.input}
                required
              />
            </div>

            {/* STATUS */}
            <div style={s.field}>
              <label style={s.label}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={s.input}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {/* NOTE */}
            <div style={s.field}>
              <label style={s.label}>Note (optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Invoice #001"
                style={s.input}
              />
            </div>

            <button type="submit" style={s.submitBtn} disabled={saving}>
              {saving ? "Adding..." : "+ Add Payment"}
            </button>
          </form>
        </div>

        {/* ── RIGHT: TABS + TABLE ── */}
        <div style={{ flex: 1 }}>
          {/* TABS */}
          <div style={s.tabRow}>
            <button
              style={{
                ...s.tab,
                ...(activeTab === "payments" ? s.tabActive : {}),
              }}
              onClick={() => setActiveTab("payments")}
            >
              All Payments
            </button>
            <button
              style={{
                ...s.tab,
                ...(activeTab === "summary" ? s.tabActive : {}),
              }}
              onClick={() => setActiveTab("summary")}
            >
              Vendor Summary
            </button>
          </div>

          {/* ── ALL PAYMENTS TABLE ── */}
          {activeTab === "payments" && (
            <div style={s.tableCard}>
              {payments.length === 0 ? (
                <div style={s.empty}>
                  <p style={{ fontWeight: 500, marginBottom: 4 }}>
                    No payments yet
                  </p>
                  <p style={{ fontSize: "13px", color: "#9ca3af" }}>
                    Add your first payment using the form
                  </p>
                </div>
              ) : (
                <table style={s.table}>
                  <thead>
                    <tr style={s.thead}>
                      <th style={s.th}>#</th>
                      <th style={s.th}>Vendor</th>
                      <th style={s.th}>Amount</th>
                      <th style={s.th}>Status</th>
                      <th style={s.th}>Note</th>
                      <th style={s.th}>Date</th>
                      <th style={s.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} style={s.tr}>
                        <td style={s.td}>{p.id}</td>
                        <td style={s.td}>{p.vendor_name}</td>
                        <td style={s.td}>
                          Rs {Number(p.amount).toLocaleString()}
                        </td>
                        <td style={s.td}>
                          <span
                            style={{
                              ...s.badge,
                              background:
                                p.status === "paid" ? "#EAF3DE" : "#FAEEDA",
                              color:
                                p.status === "paid" ? "#3B6D11" : "#854F0B",
                            }}
                          >
                            {p.status === "paid" ? "Paid" : "Pending"}
                          </span>
                        </td>
                        <td
                          style={{
                            ...s.td,
                            color: "#9ca3af",
                            fontStyle: "italic",
                          }}
                        >
                          {p.note || "—"}
                        </td>
                        <td style={s.td}>{p.date}</td>
                        <td style={s.td}>
                          <button
                            onClick={() => handleDelete(p.id)}
                            style={s.delBtn}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* ── VENDOR SUMMARY TABLE ── */}
          {activeTab === "summary" && (
            <div style={s.tableCard}>
              {summary.length === 0 ? (
                <div style={s.empty}>
                  <p>No vendor data yet</p>
                </div>
              ) : (
                <table style={s.table}>
                  <thead>
                    <tr style={s.thead}>
                      <th style={s.th}>Vendor</th>
                      <th style={s.th}>Phone</th>
                      <th style={s.th}>Total Amount</th>
                      <th style={s.th}>Paid</th>
                      <th style={s.th}>Pending (Due)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.map((v) => (
                      <tr key={v.vendor_id} style={s.tr}>
                        <td style={{ ...s.td, fontWeight: 500 }}>
                          {v.vendor_name}
                        </td>
                        <td style={s.td}>{v.vendor_phone}</td>
                        <td style={s.td}>
                          Rs {Number(v.total_amount).toLocaleString()}
                        </td>
                        <td
                          style={{ ...s.td, color: "#3B6D11", fontWeight: 500 }}
                        >
                          Rs {Number(v.total_paid).toLocaleString()}
                        </td>
                        <td
                          style={{
                            ...s.td,
                            color: v.total_pending > 0 ? "#854F0B" : "#9ca3af",
                            fontWeight: 500,
                          }}
                        >
                          {v.total_pending > 0
                            ? `Rs ${Number(v.total_pending).toLocaleString()}`
                            : "No due"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page: {
    padding: "24px",
    background: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: 500,
    color: "#111827",
    margin: 0,
    marginBottom: "3px",
  },
  sub: { fontSize: "13px", color: "#9ca3af", margin: 0 },

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "20px",
  },
  stat: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "10px",
    padding: "14px 16px",
  },
  statLabel: { fontSize: "11px", color: "#9ca3af", margin: "0 0 4px" },
  statVal: { fontSize: "20px", fontWeight: 500, color: "#111827", margin: 0 },

  layout: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "20px",
    alignItems: "start",
  },

  formCard: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
  },
  cardTitle: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#111827",
    margin: "0 0 16px",
  },
  formErr: {
    background: "#FCEBEB",
    color: "#A32D2D",
    padding: "8px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    marginBottom: "12px",
  },

  field: { marginBottom: "12px" },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#9ca3af",
    marginBottom: "4px",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    border: "0.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "13px",
    fontFamily: "inherit",
    color: "#111827",
    background: "white",
    outline: "none",
  },
  submitBtn: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: "4px",
  },

  tabRow: {
    display: "flex",
    borderBottom: "0.5px solid #e5e7eb",
    marginBottom: "0",
  },
  tab: {
    padding: "9px 18px",
    fontSize: "13px",
    color: "#9ca3af",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    fontFamily: "inherit",
    marginBottom: "-0.5px",
  },
  tabActive: { color: "#2563eb", borderBottomColor: "#2563eb" },

  tableCard: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "0 12px 12px 12px",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#f9fafb" },
  th: {
    padding: "10px 14px",
    fontSize: "11px",
    color: "#9ca3af",
    textAlign: "left",
    fontWeight: 500,
    textTransform: "uppercase",
    borderBottom: "0.5px solid #e5e7eb",
  },
  tr: { borderBottom: "0.5px solid #f3f4f6" },
  td: { padding: "11px 14px", fontSize: "13px", color: "#374151" },

  badge: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 500,
  },
  delBtn: {
    padding: "5px 12px",
    background: "white",
    color: "#A32D2D",
    border: "0.5px solid #fca5a5",
    borderRadius: "6px",
    fontSize: "11px",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  empty: {
    textAlign: "center",
    padding: "48px 0",
    color: "#6b7280",
    fontSize: "14px",
  },
};

export default VendorPayments;
