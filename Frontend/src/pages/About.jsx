// function About() {
//   return (
//     <div className="max-w-5xl mx-auto px-6 py-12">
//       {/* HEADER */}
//       <h1 className="text-3xl font-bold mb-4 text-gray-900">
//         About Shrestha Suppliers
//       </h1>

//       <p className="text-gray-600 mb-8">
//         Shrestha Suppliers is a hardware store based in Pokhara, Nepal. We
//         provide high quality bathroom fittings ,kitchen fittings and many more. So, this system helps
//         to manage products, vendors, and sales efficiently.
//       </p>

//       {/* MISSION */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
//         <p className="text-gray-600">
//           Our goal is to simplify hardware store management using technology,
//           making inventory tracking, sales recording, and analytics easier.
//         </p>
//       </div>

//       {/* FEATURES */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">System Features</h2>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="border rounded-xl p-4 shadow-sm">
//             <h3 className="font-semibold">Inventory Management</h3>
//             <p className="text-sm text-gray-500">
//               Add, update, and manage products easily.
//             </p>
//           </div>

//           <div className="border rounded-xl p-4 shadow-sm">
//             <h3 className="font-semibold">Sales Recording</h3>
//             <p className="text-sm text-gray-500">
//               Record sales and automatically update stock.
//             </p>
//           </div>

//           <div className="border rounded-xl p-4 shadow-sm">
//             <h3 className="font-semibold">Low Stock Alerts</h3>
//             <p className="text-sm text-gray-500">
//               Get notified when stock is low.
//             </p>
//           </div>

//           <div className="border rounded-xl p-4 shadow-sm">
//             <h3 className="font-semibold">Demand Analytics</h3>
//             <p className="text-sm text-gray-500">
//               Analyze sales trends and predict demand.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;




import { Link } from "react-router-dom";

function About() {
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#fff", color: "#111827" }}>

      {/* ── HERO ── */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)",
        padding: "64px 40px",
        textAlign: "center",
        color: "white",
      }}>
        <span style={{
          display: "inline-block", background: "rgba(255,255,255,0.15)",
          color: "white", fontSize: "11px", padding: "4px 14px",
          borderRadius: "20px", marginBottom: "16px", fontWeight: 500,
        }}>
          Pokhara, Nepal
        </span>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
          Shrestha Suppliers
        </h1>
        <p style={{ fontSize: "15px", opacity: 0.75, maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
          Your trusted local hardware store for bathroom and kitchen fittings
        </p>
      </div>

      {/* ── OUR STORY ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "48px", padding: "64px 40px",
        alignItems: "center", maxWidth: "960px", margin: "0 auto",
      }}>
        <div style={{
          borderRadius: "16px", overflow: "hidden",
          height: "280px", border: "0.5px solid #e5e7eb", background: "#f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            src="/images/showroom.jpg"
            alt="Shrestha Suppliers store"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div>
          <span style={{ fontSize: "11px", fontWeight: 500, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Our story
          </span>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: "10px 0 14px", lineHeight: 1.3 }}>
            Serving Pokhara with quality hardware
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.8, marginBottom: "14px" }}>
            Shrestha Suppliers has been a trusted name in Pokhara's hardware market.
            Located in Sundar Marg, we have been supplying quality bathroom and kitchen
            fittings to homes, contractors, and businesses across the region.
          </p>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.8 }}>
            What started as a small local shop has grown into a well-known supplier of
            genuine hardware products. We take pride in offering fair prices, honest
            service, and products that last.
          </p>
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "0.5px solid #f3f4f6" }} />

      {/* ── VALUES ── */}
      <div style={{ padding: "64px 40px", background: "#f8fafc", textAlign: "center" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>
          What we stand for
        </h2>
        <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "36px" }}>
          The principles that guide how we do business every day
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px", maxWidth: "860px", margin: "0 auto",
        }}>
          {[
            {
              icon: "🤝", bg: "#eff6ff",
              title: "Honest service",
              text: "Transparent pricing and straightforward advice. No hidden costs, no pressure — just genuine help finding the right product.",
            },
            {
              icon: "✅", bg: "#f0fdf4",
              title: "Quality products",
              text: "Every product we stock is carefully selected for durability and value. We only sell what we would use ourselves.",
            },
            {
              icon: "🏘️", bg: "#fefce8",
              title: "Local commitment",
              text: "We are a Pokhara business, serving Pokhara people. Supporting local customers and builders is at the heart of what we do.",
            },
          ].map((v, i) => (
            <div key={i} style={{
              background: "white", border: "0.5px solid #e5e7eb",
              borderRadius: "14px", padding: "28px 22px", textAlign: "left",
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "10px",
                background: v.bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "20px", marginBottom: "16px",
              }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>
                {v.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65 }}>
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS + CONTACT ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "48px", padding: "64px 40px",
        maxWidth: "960px", margin: "0 auto",
      }}>
        {/* Product range */}
        <div>
          <span style={{ fontSize: "11px", fontWeight: 500, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            What we offer
          </span>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "10px 0 20px" }}>
            Our product range
          </h2>
          <ul style={{ listStyle: "none" }}>
            {[
              "Sink mixers and kitchen fittings",
              "Basin sets and pedestals",
              "Towel rods, rings and paper holders",
              "Soap dispensers and soap cases",
              "Showers and bathroom accessories",
              "PVC pipes, bends and sockets",
              "And much more in-store",
            ].map((item, i, arr) => (
              <li key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                padding: "13px 0",
                borderBottom: i < arr.length - 1 ? "0.5px solid #f3f4f6" : "none",
                fontSize: "13px", color: "#374151",
              }}>
                <span style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#2563eb", marginTop: "4px", flexShrink: 0,
                }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Store info */}
        <div>
          <span style={{ fontSize: "11px", fontWeight: 500, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Visit us
          </span>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "10px 0 20px" }}>
            Find our store
          </h2>
          <div style={{
            background: "#f8fafc", borderRadius: "14px",
            border: "0.5px solid #e5e7eb", padding: "8px 16px",
          }}>
            {[
              { icon: "📍", label: "Address",       val: "Sundar Marg, Pokhara, Nepal" },
              { icon: "📞", label: "Phone",         val: "061-576880 · 9856020610" },
              { icon: "🕐", label: "Opening hours", val: "Sunday – Friday: 9AM – 6PM" },
              { icon: "📅", label: "Closed",        val: "Saturday" },
            ].map((row, i, arr) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "14px 0",
                borderBottom: i < arr.length - 1 ? "0.5px solid #f0f0f0" : "none",
              }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "8px",
                  background: "#eff6ff", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "15px", flexShrink: 0,
                }}>
                  {row.icon}
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "2px" }}>{row.label}</div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#111827" }}>{row.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        background: "#1e40af", padding: "52px 40px",
        textAlign: "center", color: "white",
      }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "10px" }}>
          Ready to find what you need?
        </h2>
        <p style={{ fontSize: "14px", opacity: 0.75, marginBottom: "28px" }}>
          Browse our full product catalogue and check live stock availability
        </p>
        <Link to="/products" style={{
          background: "white", color: "#1e40af", padding: "12px 28px",
          borderRadius: "10px", fontSize: "14px", fontWeight: 600,
          textDecoration: "none", display: "inline-block",
        }}>
          View Products →
        </Link>
      </div>

    </div>
  );
}

export default About;
