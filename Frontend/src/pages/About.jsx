function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        About Shrestha Suppliers
      </h1>

      <p className="text-gray-600 mb-8">
        Shrestha Suppliers is a hardware store based in Pokhara, Nepal. We
        provide high quality bathroom fittings ,kitchen fittings and many more. So, this system helps
        to manage products, vendors, and sales efficiently.
      </p>

      {/* MISSION */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-600">
          Our goal is to simplify hardware store management using technology,
          making inventory tracking, sales recording, and analytics easier.
        </p>
      </div>

      {/* FEATURES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">System Features</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Inventory Management</h3>
            <p className="text-sm text-gray-500">
              Add, update, and manage products easily.
            </p>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Sales Recording</h3>
            <p className="text-sm text-gray-500">
              Record sales and automatically update stock.
            </p>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Low Stock Alerts</h3>
            <p className="text-sm text-gray-500">
              Get notified when stock is low.
            </p>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Demand Analytics</h3>
            <p className="text-sm text-gray-500">
              Analyze sales trends and predict demand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;




// function About() {
//   return (
//     <div
//       style={{
//         maxWidth: "860px",
//         margin: "0 auto",
//         padding: "48px 32px",
//         fontFamily: "Inter, system-ui, sans-serif",
//       }}
//     >
//       {/* ── HEADER ── */}
//       <span
//         style={{
//           display: "inline-block",
//           fontSize: "11px",
//           fontWeight: 500,
//           background: "#dbeafe",
//           color: "#1e40af",
//           padding: "4px 14px",
//           borderRadius: "20px",
//           marginBottom: "16px",
//         }}
//       >
//         Final Year Project · 2026
//       </span>

//       <h1
//         style={{
//           fontSize: "32px",
//           fontWeight: 700,
//           color: "#111827",
//           lineHeight: 1.2,
//           marginBottom: "12px",
//         }}
//       >
//         About <span style={{ color: "#2563eb" }}>Shrestha Suppliers</span>
//         <br />
//         Management System
//       </h1>

//       <p
//         style={{
//           fontSize: "15px",
//           color: "#6b7280",
//           lineHeight: 1.75,
//           marginBottom: "40px",
//           maxWidth: "600px",
//         }}
//       >
//         A hardware store management system built for Shrestha Suppliers,
//         Pokhara. This system digitises inventory tracking, sales recording, and
//         uses AI to predict product demand.
//       </p>

//       <hr
//         style={{
//           border: "none",
//           borderTop: "0.5px solid #e5e7eb",
//           marginBottom: "40px",
//         }}
//       />

//       {/* ── MISSION ── */}
//       <div
//         style={{
//           background: "#eff6ff",
//           border: "0.5px solid #bfdbfe",
//           borderRadius: "14px",
//           padding: "28px 32px",
//           marginBottom: "40px",
//           display: "flex",
//           gap: "20px",
//           alignItems: "flex-start",
//         }}
//       >
//         <div
//           style={{
//             width: "44px",
//             height: "44px",
//             background: "#2563eb",
//             borderRadius: "10px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//           }}
//         >
//           <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//             <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.5" />
//             <path
//               d="M7 10l2 2 4-4"
//               stroke="white"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//         <div>
//           <div
//             style={{
//               fontSize: "14px",
//               fontWeight: 600,
//               color: "#1e40af",
//               marginBottom: "6px",
//             }}
//           >
//             Our mission
//           </div>
//           <p
//             style={{
//               fontSize: "13px",
//               color: "#1e40af",
//               lineHeight: 1.7,
//               opacity: 0.85,
//             }}
//           >
//             To simplify hardware store management using technology — making
//             inventory tracking, sales recording, and demand forecasting easier
//             for small businesses in Nepal.
//           </p>
//         </div>
//       </div>

//       {/* ── FEATURES ── */}
//       <div
//         style={{
//           fontSize: "11px",
//           fontWeight: 500,
//           color: "#2563eb",
//           textTransform: "uppercase",
//           letterSpacing: "0.08em",
//           marginBottom: "8px",
//         }}
//       >
//         System features
//       </div>
//       <h2
//         style={{
//           fontSize: "20px",
//           fontWeight: 600,
//           color: "#111827",
//           marginBottom: "20px",
//         }}
//       >
//         What this system does
//       </h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: "14px",
//           marginBottom: "40px",
//         }}
//       >
//         {[
//           {
//             icon: "📦",
//             title: "Inventory management",
//             text: "Add, update, and manage products with real-time stock tracking across all categories.",
//             accent: "#2563eb",
//           },
//           {
//             icon: "🧾",
//             title: "Sales recording",
//             text: "Record sales with multi-product support. Stock is automatically deducted on every sale.",
//             accent: "#2563eb",
//           },
//           {
//             icon: "🔔",
//             title: "Low stock alerts",
//             text: "Automatic notifications when product stock drops below the threshold.",
//             accent: "#2563eb",
//           },
//           {
//             icon: "📊",
//             title: "AI demand forecast",
//             text: "Weighted moving average algorithm predicts which products will sell most next month.",
//             accent: "#16a34a",
//             iconBg: "#f0fdf4",
//           },
//         ].map((f, i) => (
//           <div
//             key={i}
//             style={{
//               background: "white",
//               border: "0.5px solid #e5e7eb",
//               borderTop: `3px solid ${f.accent}`,
//               borderRadius: "12px",
//               padding: "20px",
//             }}
//           >
//             <div
//               style={{
//                 width: "36px",
//                 height: "36px",
//                 borderRadius: "8px",
//                 background: f.iconBg || "#eff6ff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "16px",
//                 marginBottom: "12px",
//               }}
//             >
//               {f.icon}
//             </div>
//             <h3
//               style={{
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 color: "#111827",
//                 marginBottom: "6px",
//               }}
//             >
//               {f.title}
//             </h3>
//             <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6 }}>
//               {f.text}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* ── TECH STACK ── */}
//       <div
//         style={{
//           fontSize: "11px",
//           fontWeight: 500,
//           color: "#2563eb",
//           textTransform: "uppercase",
//           letterSpacing: "0.08em",
//           marginBottom: "8px",
//         }}
//       >
//         Built with
//       </div>
//       <h2
//         style={{
//           fontSize: "20px",
//           fontWeight: 600,
//           color: "#111827",
//           marginBottom: "10px",
//         }}
//       >
//         Technology stack
//       </h2>
//       <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
//         Built as a full-stack web application using modern technologies.
//       </p>
//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           flexWrap: "wrap",
//           marginBottom: "40px",
//         }}
//       >
//         {[
//           {
//             label: "React.js",
//             bg: "#eff6ff",
//             color: "#1e40af",
//             border: "#bfdbfe",
//           },
//           {
//             label: "React Router",
//             bg: "#eff6ff",
//             color: "#1e40af",
//             border: "#bfdbfe",
//           },
//           {
//             label: "Chart.js",
//             bg: "#eff6ff",
//             color: "#1e40af",
//             border: "#bfdbfe",
//           },
//           {
//             label: "Django",
//             bg: "#f0fdf4",
//             color: "#166534",
//             border: "#bbf7d0",
//           },
//           {
//             label: "Django REST Framework",
//             bg: "#f0fdf4",
//             color: "#166534",
//             border: "#bbf7d0",
//           },
//           {
//             label: "SQLite",
//             bg: "#f0fdf4",
//             color: "#166534",
//             border: "#bbf7d0",
//           },
//           {
//             label: "Weighted Moving Avg (AI)",
//             bg: "#f5f3ff",
//             color: "#5b21b6",
//             border: "#ddd6fe",
//           },
//           {
//             label: "Tailwind CSS",
//             bg: "#f3f4f6",
//             color: "#374151",
//             border: "#e5e7eb",
//           },
//         ].map((t, i) => (
//           <span
//             key={i}
//             style={{
//               fontSize: "11px",
//               padding: "5px 14px",
//               borderRadius: "20px",
//               background: t.bg,
//               color: t.color,
//               border: `0.5px solid ${t.border}`,
//               fontWeight: 500,
//             }}
//           >
//             {t.label}
//           </span>
//         ))}
//       </div>

//       <hr
//         style={{
//           border: "none",
//           borderTop: "0.5px solid #e5e7eb",
//           marginBottom: "40px",
//         }}
//       />

//       {/* ── STORE INFO ── */}
//       <div
//         style={{
//           fontSize: "11px",
//           fontWeight: 500,
//           color: "#2563eb",
//           textTransform: "uppercase",
//           letterSpacing: "0.08em",
//           marginBottom: "8px",
//         }}
//       >
//         The store
//       </div>
//       <h2
//         style={{
//           fontSize: "20px",
//           fontWeight: 600,
//           color: "#111827",
//           marginBottom: "10px",
//         }}
//       >
//         Shrestha Suppliers
//       </h2>
//       <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.75 }}>
//         A local hardware store based in Sundar Marg, Pokhara, Nepal. Supplying
//         quality bathroom and kitchen fittings to homes and businesses. This
//         system was developed as a Final Year Project to help the store manage
//         its operations digitally — replacing manual records with a smart,
//         web-based system.
//       </p>
//     </div>
//   );
// }

// export default About;

