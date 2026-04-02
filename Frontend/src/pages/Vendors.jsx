import { useEffect, useState } from "react";

function Vendors() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // group products by vendor
  const vendorMap = {};
  products.forEach((p) => {
    const vendor = p.supplier || "Unknown";
    if (!vendorMap[vendor]) vendorMap[vendor] = [];
    vendorMap[vendor].push(p);
  });
  const vendors = Object.entries(vendorMap);

  const stockColor = (stock) => {
    if (stock <= 10) return "#dc2626";
    if (stock <= 50) return "#ea580c";
    return "#16a34a";
  };

  if (loading) {
    return (
      <div style={{ padding: "28px 32px", color: "#9ca3af", fontSize: "13px" }}>
        Loading vendors...
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 32px" }}>
      {/* HEADER */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "4px",
          }}
        >
          Vendors
        </h1>
        <p style={{ fontSize: "13px", color: "#6b7280" }}>
          {vendors.length} vendors supplying products to Shrestha Suppliers
        </p>
      </div>

      {/* VENDOR CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {vendors.map(([vendor, prods]) => (
          <div
            key={vendor}
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px",
              transition: "box-shadow 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            {/* Vendor avatar */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                marginBottom: "12px",
              }}
            >
              🏪
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "4px",
              }}
            >
              {vendor}
            </div>

            {/* Products count */}
            <div
              style={{
                marginTop: "14px",
                paddingTop: "14px",
                borderTop: "1px solid #f3f4f6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                Products supplied
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {prods.length}
              </span>
            </div>

            {/* Category tags */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              {[...new Set(prods.map((p) => p.category))].map((cat) => (
                <span
                  key={cat}
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                    background:
                      cat === "Kitchen Fittings" ? "#eff6ff" : "#faf5ff",
                    color: cat === "Kitchen Fittings" ? "#2563eb" : "#7c3aed",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCTS BY VENDOR TABLE */}
      <div
        style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{ fontSize: "15px", fontWeight: "600", color: "#111827" }}
            >
              Products by Vendor
            </div>
            <div
              style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}
            >
              All products grouped with their supplier
            </div>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {["Product", "Category", "Vendor", "Price", "Stock"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "11px 16px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vendors.map(([vendor, prods]) =>
              prods.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: "1px solid #f3f4f6" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "white")
                  }
                >
                  {/* Product name */}
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#111827",
                    }}
                  >
                    {p.name}
                  </td>

                  {/* Category */}
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: "500",
                        background:
                          p.category === "Kitchen Fittings"
                            ? "#eff6ff"
                            : "#faf5ff",
                        color:
                          p.category === "Kitchen Fittings"
                            ? "#2563eb"
                            : "#7c3aed",
                      }}
                    >
                      {p.category}
                    </span>
                  </td>

                  {/* Vendor */}
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: "500",
                        background: "#f0fdf4",
                        color: "#15803d",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#22c55e",
                          display: "inline-block",
                        }}
                      ></span>
                      {vendor}
                    </span>
                  </td>

                  {/* Price */}
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    Rs {Number(p.price).toLocaleString()}
                  </td>

                  {/* Stock */}
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: stockColor(p.stock),
                    }}
                  >
                    {p.stock}
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vendors;
