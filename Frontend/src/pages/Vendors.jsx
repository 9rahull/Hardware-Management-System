import { useEffect, useState } from "react";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const fetchVendors = () => {
    fetch("http://127.0.0.1:8000/api/vendors/")
      .then((res) => res.json())
      .then((data) => setVendors(data));
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // ── ADD ──
  const handleAddVendor = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/vendors/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, address }),
    });
    if (res.ok) {
      setName("");
      setPhone("");
      setAddress("");
      fetchVendors();
    } else {
      alert("Failed to add vendor");
    }
  };

  // ── DELETE ──
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vendor?")) return;
    const res = await fetch(`http://127.0.0.1:8000/api/vendors/${id}/delete/`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchVendors();
    } else {
      alert("Failed to delete vendor");
    }
  };

  // ── EDIT ──
  const startEdit = (vendor) => {
    setEditingId(vendor.id);
    setEditForm({
      name: vendor.name,
      phone: vendor.phone,
      address: vendor.address,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/vendors/${id}/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setEditingId(null);
      fetchVendors();
    } else {
      alert("Failed to update vendor");
    }
  };

  const filtered = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      (v.address || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.topbar}>
        <div>
          <h2 style={s.title}>Vendors</h2>
          <p style={s.sub}>Manage your product suppliers</p>
        </div>
      </div>

      {/* Add vendor form */}
      <div style={s.addCard}>
        <p style={s.formTitle}>Add new vendor</p>
        <form onSubmit={handleAddVendor}>
          <div style={s.formRow}>
            <input
              style={s.inp}
              type="text"
              placeholder="Vendor name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              style={s.inp}
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              style={{ ...s.inp, flex: 1 }}
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button type="submit" style={s.addBtn}>
              + Add vendor
            </button>
          </div>
        </form>
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        <div style={s.stat}>
          <p style={s.slbl}>Total vendors</p>
          <p style={s.sval}>{vendors.length}</p>
        </div>
        <div style={s.stat}>
          <p style={s.slbl}>Pokhara</p>
          <p style={s.sval}>
            {
              vendors.filter((v) =>
                (v.address || "").toLowerCase().includes("pokhara"),
              ).length
            }
          </p>
        </div>
        <div style={s.stat}>
          <p style={s.slbl}>Other cities</p>
          <p style={s.sval}>
            {
              vendors.filter(
                (v) => !(v.address || "").toLowerCase().includes("pokhara"),
              ).length
            }
          </p>
        </div>
      </div>

      {/* Search */}
      <input
        style={s.search}
        type="text"
        placeholder="Search vendors by name or address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Vendor grid */}
      {filtered.length === 0 ? (
        <div style={s.empty}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              marginBottom: "4px",
            }}
          >
            No vendors found
          </p>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            Add your first vendor using the form above
          </p>
        </div>
      ) : (
        <div style={s.grid}>
          {filtered.map((v) =>
            editingId === v.id ? (
              // ── EDIT CARD ──
              <div key={v.id} style={s.editCard}>
                <p style={s.editLabel}>Editing vendor</p>
                <input
                  style={{ ...s.inp, marginBottom: "8px" }}
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Vendor name"
                />
                <input
                  style={{ ...s.inp, marginBottom: "8px" }}
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  placeholder="Phone number"
                />
                <input
                  style={{ ...s.inp, marginBottom: "12px" }}
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({ ...editForm, address: e.target.value })
                  }
                  placeholder="Address"
                />
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    style={s.saveBtn}
                    onClick={() => handleSaveEdit(v.id)}
                  >
                    Save changes
                  </button>
                  <button style={s.cancelBtn} onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // ── VENDOR CARD ──
              <div key={v.id} style={s.vcard}>
                <div style={s.vcardTop}>
                  <p style={s.vname}>{v.name}</p>
                </div>
                <div style={s.vinfo}>
                  <div style={s.vrow}>
                    <span style={s.vicon}>📞</span>
                    <span>{v.phone || "—"}</span>
                  </div>
                  <div style={s.vrow}>
                    <span style={s.vicon}>📍</span>
                    <span>{v.address || "—"}</span>
                  </div>
                </div>
                <div style={s.actions}>
                  <button style={s.editBtn} onClick={() => startEdit(v)}>
                    Edit
                  </button>
                  <button style={s.delBtn} onClick={() => handleDelete(v.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ),
          )}
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

  addCard: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
  },
  formTitle: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#111827",
    marginBottom: "14px",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "10px",
  },
  inp: {
    width: "100%",
    padding: "9px 12px",
    border: "0.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "13px",
    fontFamily: "inherit",
    color: "#111827",
    outline: "none",
    background: "white",
  },
  addBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "9px 20px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "12px",
    marginBottom: "16px",
  },
  stat: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "10px",
    padding: "12px 16px",
  },
  slbl: { fontSize: "11px", color: "#9ca3af", margin: 0, marginBottom: "4px" },
  sval: { fontSize: "20px", fontWeight: 500, color: "#111827", margin: 0 },

  search: {
    width: "100%",
    padding: "9px 12px",
    border: "0.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "13px",
    fontFamily: "inherit",
    outline: "none",
    background: "white",
    marginBottom: "16px",
    display: "block",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: "12px",
  },
  empty: { textAlign: "center", padding: "48px 0" },

  vcard: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "16px",
  },
  vcardTop: { marginBottom: "10px" },
  vname: { fontSize: "13px", fontWeight: 500, color: "#111827", margin: 0 },
  vinfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginBottom: "12px",
  },
  vrow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#6b7280",
  },
  vicon: { fontSize: "12px", flexShrink: 0 },
  actions: { display: "flex", gap: "6px" },
  editBtn: {
    flex: 1,
    padding: "6px",
    border: "0.5px solid #e5e7eb",
    borderRadius: "6px",
    background: "white",
    fontSize: "11px",
    fontWeight: 500,
    color: "#374151",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  delBtn: {
    padding: "6px 10px",
    border: "0.5px solid #fca5a5",
    borderRadius: "6px",
    background: "white",
    fontSize: "11px",
    fontWeight: 500,
    color: "#A32D2D",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  editCard: {
    background: "white",
    border: "1.5px solid #2563eb",
    borderRadius: "12px",
    padding: "16px",
  },
  editLabel: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#2563eb",
    marginBottom: "10px",
  },
  saveBtn: {
    flex: 1,
    padding: "7px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  cancelBtn: {
    padding: "7px 12px",
    border: "0.5px solid #e5e7eb",
    borderRadius: "6px",
    background: "white",
    fontSize: "12px",
    color: "#6b7280",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default Vendors;
