import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const BASE_URL = "http://127.0.0.1:8000";
const PAGE_SIZE = 8;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/products/?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results || data);
        setTotalCount(data.count || (data.results || data).length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentPage]);

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchQ =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // ── Fix image URL ──
  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      {/* ── TOOLBAR ── */}
      <div style={s.toolbar}>
        <button onClick={() => navigate(-1)} style={s.backBtn}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 11L5 7l4-4"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>

        <input
          style={s.search}
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div style={s.cats}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              style={{
                ...s.cat,
                background: activeCategory === cat ? "#111827" : "white",
                color: activeCategory === cat ? "white" : "#6b7280",
                borderColor: activeCategory === cat ? "#111827" : "#e5e7eb",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <span style={s.countLabel}>
          {loading
            ? "Loading..."
            : `${totalCount} products · Page ${currentPage} of ${totalPages}`}
        </span>
      </div>

      {/* ── GRID ── */}
      <div style={s.content}>
        {loading ? (
          <p style={{ color: "#9ca3af", fontSize: "14px", padding: "40px 0" }}>
            Loading products...
          </p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              No products found
            </p>
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>
              Try a different search or category
            </p>
          </div>
        ) : (
          <div style={s.grid}>
            {filtered.map((p) => {
              const imgUrl = getImageUrl(p.image);
              const inStock = p.stock > 10;
              return (
                <div key={p.id} style={s.card}>
                  <div style={s.imgWrap}>
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={p.name}
                        style={s.img}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      style={{
                        ...s.imgFallback,
                        display: imgUrl ? "none" : "flex",
                      }}
                    >
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="28"
                          height="20"
                          rx="4"
                          stroke="#e5e7eb"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="5"
                          stroke="#e5e7eb"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#d1d5db",
                          marginTop: "4px",
                        }}
                      >
                        No image
                      </span>
                    </div>
                  </div>

                  <div style={s.cardBody}>
                    <div style={s.cardCat}>{p.category}</div>
                    <div style={s.cardName}>{p.name}</div>
                    <div
                      style={{
                        ...s.cardStock,
                        color: inStock ? "#9ca3af" : "#A32D2D",
                      }}
                    >
                      {inStock
                        ? `In stock · ${p.stock} units`
                        : `Low stock — ${p.stock} left`}
                    </div>
                    <div style={s.cardPrice}>
                      Rs {Number(p.price).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div style={s.pagination}>
            <button
              style={{
                ...s.pgBtn,
                opacity: currentPage === 1 ? 0.35 : 1,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  ...s.pgBtn,
                  background: currentPage === page ? "#111827" : "white",
                  color: currentPage === page ? "white" : "#374151",
                  borderColor: currentPage === page ? "#111827" : "#e5e7eb",
                  fontWeight: currentPage === page ? 500 : 400,
                }}
              >
                {page}
              </button>
            ))}

            <button
              style={{
                ...s.pgBtn,
                opacity: currentPage === totalPages ? 0.35 : 1,
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 32px",
    borderBottom: "0.5px solid #f3f4f6",
    background: "white",
    flexWrap: "wrap",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "13px",
    color: "#6b7280",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit",
    marginRight: "4px",
    flexShrink: 0,
  },
  search: {
    width: "220px",
    padding: "8px 14px",
    border: "0.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "13px",
    outline: "none",
    fontFamily: "inherit",
  },
  cats: { display: "flex", gap: "6px", flex: 1, flexWrap: "wrap" },
  cat: {
    fontSize: "12px",
    padding: "5px 14px",
    borderRadius: "20px",
    border: "0.5px solid",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  countLabel: {
    fontSize: "12px",
    color: "#9ca3af",
    whiteSpace: "nowrap",
    marginLeft: "auto",
  },

  content: { padding: "20px 32px 40px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
    gap: "16px",
    marginBottom: "32px",
  },

  card: {
    background: "white",
    border: "0.5px solid #f0f0f0",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
  },
  imgWrap: {
    width: "100%",
    aspectRatio: "1",
    background: "#f9fafb",
    position: "relative",
    overflow: "hidden",
  },
  img: { width: "100%", height: "100%", objectFit: "contain", padding: "16px" },
  imgFallback: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: { padding: "12px 14px 14px" },
  cardCat: { fontSize: "10px", color: "#9ca3af", marginBottom: "4px" },
  cardName: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#111827",
    marginBottom: "4px",
    lineHeight: 1.3,
  },
  cardStock: { fontSize: "11px", marginBottom: "8px" },
  cardPrice: { fontSize: "15px", fontWeight: 600, color: "#111827" },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
  },
  pgBtn: {
    padding: "6px 12px",
    borderRadius: "7px",
    border: "0.5px solid #e5e7eb",
    background: "white",
    fontSize: "13px",
    color: "#374151",
    cursor: "pointer",
    fontFamily: "inherit",
  },
}

export default Products;
