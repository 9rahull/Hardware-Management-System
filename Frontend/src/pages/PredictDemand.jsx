// import { useEffect, useState } from "react";

// function PredictDemand() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/sales/demand-forecast/")
//       .then((res) => res.json())
//       .then((resData) => {
//         setData(resData);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) return <p style={{ padding: "20px" }}>Loading predictions...</p>;

//   return (
//     <div style={{ padding: "24px" }}>
//       <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "6px" }}>
//         AI Demand Prediction
//       </h2>

//       <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
//         Forecasting product demand based on past sales
//       </p>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: "16px",
//         }}
//       >
//         {data.map((item) => {
//           const highDemand = item.change_percent > 20;
//           const lowDemand = item.change_percent < -10;

//           return (
//             <div
//               key={item.product_id}
//               style={{
//                 background: "white",
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "12px",
//                 padding: "16px",
//               }}
//             >
//               <h3 style={{ fontSize: "15px", fontWeight: "600" }}>
//                 {item.product}
//               </h3>

//               <p style={{ fontSize: "12px", color: "#6b7280" }}>
//                 Last Month: {item.last_month}
//               </p>

//               <p style={{ fontSize: "12px", color: "#6b7280" }}>
//                 Forecast: {item.forecast}
//               </p>

//               <p
//                 style={{
//                   fontSize: "13px",
//                   fontWeight: "600",
//                   color: item.change_percent > 0 ? "#16a34a" : "#dc2626",
//                 }}
//               >
//                 {item.change_percent > 0 ? "⬆" : "⬇"} {item.change_percent}%
//               </p>

//               <p style={{ fontSize: "12px", color: "#6b7280" }}>
//                 Stock: {item.current_stock}
//               </p>

//               {/* 🔥 AI STATUS */}
//               <div style={{ marginTop: "10px" }}>
//                 {highDemand && item.current_stock < item.forecast && (
//                   <span style={dangerTag}>⚠ Restock Needed</span>
//                 )}

//                 {highDemand && item.current_stock >= item.forecast && (
//                   <span style={successTag}>High Demand</span>
//                 )}

//                 {lowDemand && <span style={lowTag}>Low Demand</span>}

//                 {!highDemand && !lowDemand && (
//                   <span style={normalTag}>Stable</span>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* TAG STYLES */
// const dangerTag = {
//   background: "#fee2e2",
//   color: "#dc2626",
//   padding: "4px 8px",
//   borderRadius: "6px",
//   fontSize: "12px",
// };

// const successTag = {
//   background: "#dcfce7",
//   color: "#16a34a",
//   padding: "4px 8px",
//   borderRadius: "6px",
//   fontSize: "12px",
// };

// const lowTag = {
//   background: "#fef3c7",
//   color: "#d97706",
//   padding: "4px 8px",
//   borderRadius: "6px",
//   fontSize: "12px",
// };

// const normalTag = {
//   background: "#e5e7eb",
//   color: "#374151",
//   padding: "4px 8px",
//   borderRadius: "6px",
//   fontSize: "12px",
// };

// export default PredictDemand;


// import { useEffect, useState } from "react";

// function PredictDemand() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/sales/demand-forecast/")
//       .then((res) => res.json())
//       .then((resData) => {
//         setData(resData);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError(true);
//         setLoading(false);
//       });
//   }, []);

//   const getStatus = (item) => {
//     if (item.forecast > item.current_stock) return "restock";
//     if (item.change_percent > 20) return "high";
//     if (item.change_percent < -10) return "low";
//     return "stable";
//   };

//   const filtered = data.filter((item) => {
//     const s = getStatus(item);
//     if (filter === "restock") return s === "restock";
//     if (filter === "high") return s === "high";
//     return true;
//   });

//   const restockCount = data.filter((d) => getStatus(d) === "restock").length;
//   const topProduct = [...data].sort(
//     (a, b) => b.change_percent - a.change_percent,
//   )[0];

//   if (loading)
//     return (
//       <div style={styles.page}>
//         <div style={styles.loadingWrap}>
//           <div style={styles.loadingDot} />
//           <p style={styles.loadingText}>Loading demand forecast...</p>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div style={styles.page}>
//         <div style={styles.emptyWrap}>
//           <p style={styles.emptyTitle}>Could not load forecast</p>
//           <p style={styles.emptySub}>
//             Make sure the Django server is running on port 8000
//           </p>
//         </div>
//       </div>
//     );

//   if (data.length === 0)
//     return (
//       <div style={styles.page}>
//         <div style={styles.emptyWrap}>
//           <p style={styles.emptyTitle}>No sales data yet</p>
//           <p style={styles.emptySub}>
//             Record some sales first — the forecast needs at least 1 month of
//             data to generate predictions.
//           </p>
//         </div>
//       </div>
//     );

//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <div style={{ marginBottom: "22px" }}>
//         <h2 style={styles.pageTitle}>Demand forecast</h2>
//         <p style={styles.pageSub}>
//           Predicted demand using weighted moving average on past 3 months of
//           sales
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div style={styles.summaryGrid}>
//         <div style={styles.statCard}>
//           <p style={styles.statLabel}>Products analysed</p>
//           <p style={styles.statVal}>{data.length}</p>
//           <p style={styles.statSub}>All active products</p>
//         </div>
//         <div style={styles.statCard}>
//           <p style={styles.statLabel}>Restock needed</p>
//           <p
//             style={{
//               ...styles.statVal,
//               color: restockCount > 0 ? "#A32D2D" : "#3B6D11",
//             }}
//           >
//             {restockCount}
//           </p>
//           <p style={styles.statSub}>Forecast exceeds current stock</p>
//         </div>
//         <div style={styles.statCard}>
//           <p style={styles.statLabel}>Top trending</p>
//           <p style={{ ...styles.statVal, fontSize: "16px" }}>
//             {topProduct ? topProduct.product : "—"}
//           </p>
//           <p style={{ ...styles.statSub, color: "#3B6D11" }}>
//             {topProduct
//               ? `+${topProduct.change_percent}% projected growth`
//               : ""}
//           </p>
//         </div>
//       </div>

//       {/* Section Header + Filters */}
//       <div style={styles.sectionHeader}>
//         <div>
//           <p style={styles.sectionTitle}>Product predictions</p>
//           <p style={styles.sectionSub}>Sorted by forecasted demand</p>
//         </div>
//         <div style={{ display: "flex", gap: "8px" }}>
//           {["all", "restock", "high"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               style={{
//                 ...styles.filterBtn,
//                 background: filter === f ? "#1e2433" : "transparent",
//                 color: filter === f ? "#fff" : "#6b7280",
//                 borderColor: filter === f ? "#1e2433" : "#d1d5db",
//               }}
//             >
//               {f === "all"
//                 ? "All"
//                 : f === "restock"
//                   ? "Restock"
//                   : "High demand"}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Product Cards */}
//       <div style={styles.cardGrid}>
//         {filtered.map((item) => {
//           const status = getStatus(item);
//           const isUp = item.change_percent >= 0;
//           const stockPct = Math.min(
//             100,
//             Math.round((item.current_stock / (item.forecast || 1)) * 100),
//           );
//           const barColor =
//             stockPct < 30 ? "#E24B4A" : stockPct < 80 ? "#EF9F27" : "#639922";

//           return (
//             <div
//               key={item.product_id}
//               style={{
//                 ...styles.card,
//                 borderLeft:
//                   status === "restock"
//                     ? "3px solid #E24B4A"
//                     : "0.5px solid #e5e7eb",
//                 borderRadius: status === "restock" ? "0 12px 12px 0" : "12px",
//               }}
//             >
//               {/* Card Top */}
//               <div style={styles.cardTop}>
//                 <p style={styles.prodName}>{item.product}</p>
//                 <StatusBadge status={status} />
//               </div>

//               {/* Metrics */}
//               <div style={styles.metricsGrid}>
//                 <div style={styles.metricBox}>
//                   <p style={styles.metricLabel}>Last month</p>
//                   <p style={styles.metricVal}>{item.last_month}</p>
//                 </div>
//                 <div style={styles.metricBox}>
//                   <p style={styles.metricLabel}>Forecast</p>
//                   <p
//                     style={{
//                       ...styles.metricVal,
//                       color: isUp ? "#3B6D11" : "#A32D2D",
//                     }}
//                   >
//                     {item.forecast}
//                   </p>
//                 </div>
//               </div>

//               {/* Change */}
//               <div style={styles.changeRow}>
//                 <span style={styles.changeLabel}>Month-on-month change</span>
//                 <span
//                   style={{
//                     fontSize: "13px",
//                     fontWeight: 500,
//                     color: isUp ? "#3B6D11" : "#A32D2D",
//                   }}
//                 >
//                   {isUp ? "▲" : "▼"} {Math.abs(item.change_percent)}%
//                 </span>
//               </div>

//               {/* Stock bar */}
//               <div style={styles.barWrap}>
//                 <div
//                   style={{
//                     ...styles.barFill,
//                     width: `${stockPct}%`,
//                     background: barColor,
//                   }}
//                 />
//               </div>
//               <div style={styles.barLabels}>
//                 <span>Current stock: {item.current_stock}</span>
//                 <span>Needs: {item.forecast}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     restock: { label: "Restock needed", bg: "#FCEBEB", color: "#A32D2D" },
//     high: { label: "High demand", bg: "#EAF3DE", color: "#3B6D11" },
//     low: { label: "Low demand", bg: "#FAEEDA", color: "#854F0B" },
//     stable: { label: "Stable", bg: "#f3f4f6", color: "#4b5563" },
//   };
//   const { label, bg, color } = map[status];
//   return (
//     <span
//       style={{
//         fontSize: "11px",
//         padding: "3px 9px",
//         borderRadius: "20px",
//         fontWeight: 500,
//         background: bg,
//         color,
//         whiteSpace: "nowrap",
//       }}
//     >
//       {label}
//     </span>
//   );
// }

// const styles = {
//   page: {
//     padding: "24px",
//     background: "#f9fafb",
//     minHeight: "100vh",
//     fontFamily: "Inter, system-ui, sans-serif",
//   },
//   pageTitle: {
//     fontSize: "20px",
//     fontWeight: 500,
//     color: "#111827",
//     margin: 0,
//     marginBottom: "4px",
//   },
//   pageSub: {
//     fontSize: "13px",
//     color: "#6b7280",
//     margin: 0,
//   },
//   summaryGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//     gap: "12px",
//     marginBottom: "24px",
//   },
//   statCard: {
//     background: "#f3f4f6",
//     borderRadius: "8px",
//     padding: "14px 16px",
//   },
//   statLabel: {
//     fontSize: "12px",
//     color: "#6b7280",
//     margin: 0,
//     marginBottom: "6px",
//   },
//   statVal: { fontSize: "22px", fontWeight: 500, color: "#111827", margin: 0 },
//   statSub: { fontSize: "11px", color: "#9ca3af", margin: 0, marginTop: "3px" },
//   sectionHeader: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: "14px",
//   },
//   sectionTitle: {
//     fontSize: "15px",
//     fontWeight: 500,
//     color: "#111827",
//     margin: 0,
//   },
//   sectionSub: {
//     fontSize: "12px",
//     color: "#9ca3af",
//     margin: 0,
//     marginTop: "2px",
//   },
//   filterBtn: {
//     fontSize: "12px",
//     padding: "4px 12px",
//     borderRadius: "20px",
//     border: "0.5px solid",
//     cursor: "pointer",
//     fontFamily: "inherit",
//   },
//   cardGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
//     gap: "14px",
//   },
//   card: {
//     background: "white",
//     border: "0.5px solid #e5e7eb",
//     borderRadius: "12px",
//     padding: "16px",
//   },
//   cardTop: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: "12px",
//   },
//   prodName: { fontSize: "14px", fontWeight: 500, color: "#111827", margin: 0 },
//   metricsGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "8px",
//     marginBottom: "12px",
//   },
//   metricBox: {
//     background: "#f9fafb",
//     borderRadius: "6px",
//     padding: "8px 10px",
//   },
//   metricLabel: {
//     fontSize: "11px",
//     color: "#9ca3af",
//     margin: 0,
//     marginBottom: "2px",
//   },
//   metricVal: { fontSize: "15px", fontWeight: 500, color: "#111827", margin: 0 },
//   changeRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "10px",
//   },
//   changeLabel: { fontSize: "12px", color: "#9ca3af" },
//   barWrap: {
//     height: "5px",
//     background: "#f3f4f6",
//     borderRadius: "3px",
//     overflow: "hidden",
//   },
//   barFill: {
//     height: "100%",
//     borderRadius: "3px",
//     transition: "width 0.3s ease",
//   },
//   barLabels: {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: "11px",
//     color: "#9ca3af",
//     marginTop: "4px",
//   },
//   loadingWrap: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     padding: "40px 0",
//   },
//   loadingDot: {
//     width: "8px",
//     height: "8px",
//     borderRadius: "50%",
//     background: "#1D9E75",
//     animation: "pulse 1s infinite",
//   },
//   loadingText: { fontSize: "14px", color: "#6b7280", margin: 0 },
//   emptyWrap: { padding: "60px 0", textAlign: "center" },
//   emptyTitle: {
//     fontSize: "15px",
//     fontWeight: 500,
//     color: "#111827",
//     marginBottom: "6px",
//   },
//   emptySub: {
//     fontSize: "13px",
//     color: "#6b7280",
//     maxWidth: "340px",
//     margin: "0 auto",
//   },
// };

// export default PredictDemand;




import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function PredictDemand() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const barRef = useRef(null);
  const barChart = useRef(null);

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
    if (barChart.current) {
      barChart.current.destroy();
      barChart.current = null;
    }

    const labels = data.map((p) =>
      p.product.length > 11 ? p.product.slice(0, 11) + "…" : p.product,
    );

    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Last month",
            data: data.map((p) => p.last_month),
            backgroundColor: "#e5e7eb",
            borderRadius: 4,
            barPercentage: 0.65,
          },
          {
            label: "AI forecast",
            data: data.map((p) => p.forecast),
            backgroundColor: "#534AB7",
            borderRadius: 4,
            barPercentage: 0.65,
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
          },
        },
      },
    });

    return () => {
      if (barChart.current) {
        barChart.current.destroy();
        barChart.current = null;
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
            Based on weighted moving average of past 3 months of sales
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

      {/* 2 Charts */}
      <div style={s.chartsRow}>
        <div style={s.card}>
          <p style={s.ctitle}>Last month vs forecasted demand</p>
          <p style={s.csub}>Grouped by product — purple = AI prediction</p>
          <div style={{ position: "relative", width: "100%", height: "220px" }}>
            <canvas ref={barRef} />
          </div>
          <div style={s.legend}>
            <span style={s.legItem}>
              <span
                style={{
                  ...s.dot,
                  background: "#e5e7eb",
                  border: "1px solid #d1d5db",
                }}
              />
              Last month
            </span>
            <span style={s.legItem}>
              <span style={{ ...s.dot, background: "#534AB7" }} />
              AI forecast
            </span>
          </div>
        </div>

        <div style={s.card}>
          <p style={s.ctitle}>Stock coverage</p>
          <p style={s.csub}>Current stock as % of forecasted need</p>
          <div style={{ marginTop: "4px" }}>
            {data.map((p) => {
              const pct = Math.min(
                100,
                Math.round((p.current_stock / (p.forecast || 1)) * 100),
              );
              const barColor =
                pct < 40 ? "#E24B4A" : pct < 80 ? "#EF9F27" : "#1D9E75";
              const textColor =
                pct < 40 ? "#A32D2D" : pct < 80 ? "#854F0B" : "#3B6D11";
              return (
                <div key={p.product_id} style={{ marginBottom: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    <span>{p.product}</span>
                    <span style={{ fontWeight: 500, color: textColor }}>
                      {pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "6px",
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

      {/* Product cards — 3 columns */}
      <p
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#111827",
          marginBottom: "12px",
        }}
      >
        Product breakdown
      </p>
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
          const topBorder =
            st === "hot"
              ? "3px solid #E24B4A"
              : st === "rising"
                ? "3px solid #1D9E75"
                : "0.5px solid #e5e7eb";

          return (
            <div
              key={item.product_id}
              style={{ ...s.pcard, borderTop: topBorder }}
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
              <div style={s.row2}>
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
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                  Change
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: isUp ? "#3B6D11" : "#A32D2D",
                  }}
                >
                  {isUp ? "▲" : "▼"} {Math.abs(item.change_percent)}%
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
  ctitle: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#111827",
    margin: 0,
    marginBottom: "2px",
  },
  csub: { fontSize: "11px", color: "#9ca3af", margin: 0, marginBottom: "16px" },
  legend: {
    display: "flex",
    gap: "16px",
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "12px",
  },
  legItem: { display: "flex", alignItems: "center", gap: "5px" },
  dot: { width: "9px", height: "9px", borderRadius: "2px", flexShrink: 0 },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: "12px",
  },
  pcard: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "14px 16px",
  },
  pname: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#111827",
    margin: 0,
    marginBottom: "8px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  pbadge: {
    display: "inline-block",
    fontSize: "10px",
    padding: "2px 8px",
    borderRadius: "20px",
    fontWeight: 500,
    marginBottom: "10px",
  },
  row2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "10px",
  },
  mbox: { background: "#f9fafb", borderRadius: "6px", padding: "8px 10px" },
  mlbl: { fontSize: "10px", color: "#9ca3af", margin: 0, marginBottom: "2px" },
  mval: { fontSize: "15px", fontWeight: 500, color: "#111827", margin: 0 },
};

export default PredictDemand;
