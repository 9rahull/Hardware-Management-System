import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function PredictDemand() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const lineRef = useRef(null);
  const lineChart = useRef(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sales/demand-forecast/")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!data.length) return;
    if (lineChart.current) {
      lineChart.current.destroy();
      lineChart.current = null;
    }

    // ── Only show top 6 by forecast in the chart ──
    const top6 = [...data].sort((a, b) => b.forecast - a.forecast).slice(0, 6);

    const labels = top6.map((p) =>
      p.product.length > 13 ? p.product.slice(0, 13) + "…" : p.product,
    );

    lineChart.current = new Chart(lineRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Last month (actual)",
            data: top6.map((p) => p.last_month),
            borderColor: "#d1d5db",
            backgroundColor: "rgba(209,213,219,0.05)",
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: "#d1d5db",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            tension: 0.35,
            fill: false,
          },
          {
            label: "Forecast (predicted)",
            data: top6.map((p) => p.forecast),
            borderColor: "#534AB7",
            backgroundColor: "rgba(83,74,183,0.08)",
            borderWidth: 2.5,
            pointRadius: 6,
            pointBackgroundColor: "#534AB7",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (c) => `${c.dataset.label}: ${c.parsed.y} units`,
            },
          },
        },
        scales: {
          x: {
            ticks: { font: { size: 10 }, autoSkip: false, maxRotation: 20 },
            grid: { display: false },
            border: { display: false },
          },
          y: {
            ticks: { font: { size: 10 } },
            grid: { color: "#f3f4f6" },
            border: { display: false },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (lineChart.current) {
        lineChart.current.destroy();
        lineChart.current = null;
      }
    };
  }, [data]);

  const getStatus = (item) => {
    if (item.forecast > item.current_stock) return "hot";
    if (item.change_percent > 20) return "rising";
    if (item.change_percent < -10) return "low";
    return "stable";
  };

  const badgeMap = {
    hot: { label: "Restock needed", bg: "#FCEBEB", color: "#A32D2D" },
    rising: { label: "High demand", bg: "#EAF3DE", color: "#3B6D11" },
    low: { label: "Low demand", bg: "#FAEEDA", color: "#854F0B" },
    stable: { label: "Stable", bg: "#f3f4f6", color: "#4b5563" },
  };

  const borderMap = {
    hot: "3px solid #E24B4A",
    rising: "3px solid #1D9E75",
    low: "3px solid #EF9F27",
    stable: "0.5px solid #e5e7eb",
  };

  const restockCount = data.filter((d) => getStatus(d) === "hot").length;
  const topProduct = [...data].sort(
    (a, b) => b.change_percent - a.change_percent,
  )[0];
  const avgChange = data.length
    ? Math.round(
        data.reduce((sum, d) => sum + d.change_percent, 0) / data.length,
      )
    : 0;

  if (loading)
    return (
      <div style={s.page}>
        <p style={{ color: "#9ca3af" }}>Loading forecast...</p>
      </div>
    );
  if (error)
    return (
      <div style={s.page}>
        <p style={{ color: "#A32D2D" }}>
          Could not connect to backend. Make sure Django is running on port
          8000.
        </p>
      </div>
    );
  if (!data.length)
    return (
      <div style={s.page}>
        <p style={{ color: "#9ca3af" }}>
          No sales data yet. Record some sales first.
        </p>
      </div>
    );

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.topbar}>
        <div>
          <h2 style={s.title}>Demand forecast</h2>
          <p style={s.sub}>
            Weighted moving average · past 3 months of sales data
          </p>
        </div>
        <span style={s.algoBadge}>Weighted moving avg</span>
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        {[
          {
            label: "Products analysed",
            val: data.length,
            sub: "All active products",
          },
          {
            label: "Restock needed",
            val: restockCount,
            sub: "Forecast exceeds stock",
            valColor: restockCount > 0 ? "#A32D2D" : "#1D9E75",
          },
          {
            label: "Top trending",
            val: topProduct?.product ?? "—",
            valSize: "15px",
            sub: `+${topProduct?.change_percent ?? 0}% projected`,
            subColor: "#1D9E75",
          },
          {
            label: "Avg change",
            val: `${avgChange >= 0 ? "+" : ""}${avgChange}%`,
            sub: "Across all products",
            valColor: avgChange >= 0 ? "#1D9E75" : "#A32D2D",
          },
        ].map((stat, i) => (
          <div key={i} style={s.statCard}>
            <p style={s.slabel}>{stat.label}</p>
            <p
              style={{
                ...s.sval,
                fontSize: stat.valSize || "22px",
                color: stat.valColor || "#111827",
              }}
            >
              {stat.val}
            </p>
            <p style={{ ...s.ssub, color: stat.subColor || "#9ca3af" }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={s.chartsRow}>
        {/* Line chart — top 6 only */}
        <div style={s.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "2px",
            }}
          >
            <p style={s.ctitle}>Last month vs forecast</p>
            <span style={s.top6Badge}>Top 6 of {data.length}</span>
          </div>
          <p style={s.csub}>
            Highest-demand products · all products shown in breakdown below
          </p>
          <div style={{ position: "relative", width: "100%", height: "220px" }}>
            <canvas ref={lineRef} />
          </div>
          <div style={s.legend}>
            <span style={s.legItem}>
              <span
                style={{
                  ...s.dot,
                  background: "#d1d5db",
                  border: "1.5px solid #bbb",
                }}
              />
              Last month (actual)
            </span>
            <span style={s.legItem}>
              <span style={{ ...s.dot, background: "#534AB7" }} />
              Forecast (predicted)
            </span>
          </div>
          <p
            style={{
              fontSize: "11px",
              color: "#c4c9d4",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            Remaining {data.length - 6} products shown in the breakdown cards
            below
          </p>
        </div>

        {/* Stock coverage */}
        <div style={s.card}>
          <p style={s.ctitle}>Stock coverage</p>
          <p style={s.csub}>
            How much of the forecast demand is covered by current stock
          </p>
          <div style={{ marginTop: "4px" }}>
            {data.map((p) => {
              const pct = Math.min(
                100,
                Math.round((p.current_stock / (p.forecast || 1)) * 100),
              );
              const barColor =
                pct < 40 ? "#E24B4A" : pct < 80 ? "#EF9F27" : "#1D9E75";
              const txtColor =
                pct < 40 ? "#A32D2D" : pct < 80 ? "#854F0B" : "#3B6D11";
              return (
                <div key={p.product_id} style={{ marginBottom: "11px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "160px",
                      }}
                    >
                      {p.product}
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: txtColor,
                        flexShrink: 0,
                        marginLeft: "8px",
                      }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "5px",
                      background: "#f3f4f6",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: barColor,
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product breakdown — 2 columns, ALL products */}
      <div style={s.sectionHdr}>
        <div>
          <p style={s.sectionTitle}>Product breakdown</p>
          <p style={s.sectionSub}>
            All {data.length} products sorted by forecasted demand
          </p>
        </div>
      </div>

      <div style={s.cardGrid}>
        {data.map((item) => {
          const st = getStatus(item);
          const badge = badgeMap[st];
          const isUp = item.change_percent >= 0;
          const pct = Math.min(
            100,
            Math.round((item.current_stock / (item.forecast || 1)) * 100),
          );
          const barColor =
            pct < 40 ? "#E24B4A" : pct < 80 ? "#EF9F27" : "#1D9E75";

          return (
            <div
              key={item.product_id}
              style={{ ...s.pcard, borderTop: borderMap[st] }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <p style={s.pname}>{item.product}</p>
                <span
                  style={{
                    ...s.pbadge,
                    background: badge.bg,
                    color: badge.color,
                  }}
                >
                  {badge.label}
                </span>
              </div>

              <div style={s.mrow}>
                <div style={s.mbox}>
                  <p style={s.mlbl}>Last month</p>
                  <p style={s.mval}>{item.last_month}</p>
                </div>
                <div style={s.mbox}>
                  <p style={s.mlbl}>Forecast</p>
                  <p style={{ ...s.mval, color: isUp ? "#3B6D11" : "#A32D2D" }}>
                    {item.forecast}
                  </p>
                </div>
                <div style={s.mbox}>
                  <p style={s.mlbl}>Change</p>
                  <p style={{ ...s.mval, color: isUp ? "#3B6D11" : "#A32D2D" }}>
                    {isUp ? "▲" : "▼"} {Math.abs(item.change_percent)}%
                  </p>
                </div>
              </div>

              <div
                style={{
                  height: "4px",
                  background: "#f3f4f6",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: barColor,
                    borderRadius: "2px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  color: "#9ca3af",
                  marginTop: "3px",
                }}
              >
                <span>Stock: {item.current_stock}</span>
                <span>Need: {item.forecast}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  page: {
    padding: "28px",
    background: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "20px",
    fontWeight: 500,
    color: "#111827",
    margin: 0,
    marginBottom: "3px",
  },
  sub: { fontSize: "13px", color: "#9ca3af", margin: 0 },
  algoBadge: {
    background: "#EAF3DE",
    color: "#3B6D11",
    fontSize: "11px",
    padding: "5px 14px",
    borderRadius: "20px",
    fontWeight: 500,
  },
  top6Badge: {
    background: "#eff6ff",
    color: "#1e40af",
    fontSize: "10px",
    padding: "2px 10px",
    borderRadius: "20px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
    gap: "12px",
    marginBottom: "24px",
  },
  statCard: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "10px",
    padding: "14px 16px",
  },
  slabel: {
    fontSize: "11px",
    color: "#9ca3af",
    margin: 0,
    marginBottom: "6px",
  },
  sval: { fontSize: "22px", fontWeight: 500, margin: 0 },
  ssub: { fontSize: "11px", margin: 0, marginTop: "3px" },
  chartsRow: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    gap: "16px",
    marginBottom: "24px",
  },
  card: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
  },
  ctitle: { fontSize: "13px", fontWeight: 500, color: "#111827", margin: 0 },
  csub: {
    fontSize: "11px",
    color: "#9ca3af",
    margin: 0,
    marginBottom: "16px",
    marginTop: "2px",
  },
  legend: {
    display: "flex",
    gap: "16px",
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "12px",
    flexWrap: "wrap",
  },
  legItem: { display: "flex", alignItems: "center", gap: "5px" },
  dot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    flexShrink: 0,
    display: "inline-block",
  },
  sectionHdr: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#111827",
    margin: 0,
  },
  sectionSub: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0,
    marginTop: "2px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0,1fr))",
    gap: "12px",
  },
  pcard: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "16px",
  },
  pname: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#111827",
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "200px",
  },
  pbadge: {
    fontSize: "10px",
    padding: "2px 8px",
    borderRadius: "20px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  mrow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "6px",
    marginBottom: "10px",
  },
  mbox: { background: "#f9fafb", borderRadius: "6px", padding: "7px 10px" },
  mlbl: { fontSize: "10px", color: "#9ca3af", margin: 0, marginBottom: "2px" },
  mval: { fontSize: "13px", fontWeight: 500, color: "#111827", margin: 0 },
};

export default PredictDemand;
