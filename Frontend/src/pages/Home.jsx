// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

// function Home() {

//   // 🔥 IMAGES
//   const images = [
//     "/images/sink.jpg",
//     "/images/showroom.jpg"
//   ];

//   const [current, setCurrent] = useState(0);

//   // 🔄 AUTO CHANGE EVERY 5 SECONDS
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <Navbar />

//       {/* 🔥 HERO SECTION */}
//       <div className="bg-gradient-to-r from-blue-50 to-gray-100 py-16 px-6">

//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

//           {/* LEFT TEXT */}
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">
//               Welcome to <span className="text-blue-600">Shrestha Suppliers</span>
//             </h1>

//             <p className="text-gray-500 mb-6">
//               Your trusted hardware store in Pokhara, Nepal. Supplying quality
//               bathroom and kitchen fittings.
//             </p>

//             <Link
//               to="/products"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
//             >
//               View Products →
//             </Link>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div>
//             <img
//               src={images[current]}
//               alt="hardware"
//               className="w-full h-[400px] object-contain rounded-xl shadow-lg bg-white"
//             />
//           </div>

//         </div>

//       </div>

//       {/* MAIN SECTION */}
//       <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">

//         {/* ABOUT */}
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 mb-1">About Us</h2>
//           <p className="text-xs text-gray-400 mb-5">Who we are and what we do</p>

//           <div className="space-y-4">

//             <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
//               <h3 className="text-sm font-semibold mb-2">Who We Are</h3>
//               <p className="text-sm text-gray-500">
//                 Shrestha Suppliers is a local hardware store in Pokhara. We supply
//                 quality bathroom and kitchen fittings to homes and businesses.
//               </p>
//             </div>

//             <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
//               <h3 className="text-sm font-semibold mb-2">What We Sell</h3>
//               <p className="text-sm text-gray-500">
//                 We stock sink mixers, basin sets, towel rods, soap dispensers,
//                 and other hardware items.
//               </p>
//             </div>

//             <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
//               <h3 className="text-sm font-semibold mb-2">About This System</h3>
//               <p className="text-sm text-gray-500">
//                 This system helps manage inventory, track stock, and maintain
//                 records digitally.
//               </p>
//             </div>

//           </div>
//         </div>

//         {/* SHOP INFO */}
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 mb-1">
//             Shop Information
//           </h2>
//           <p className="text-xs text-gray-400 mb-5">Find us and get in touch</p>

//           <div className="bg-white border rounded-xl overflow-hidden shadow-sm">

//             <div className="flex gap-4 px-5 py-4 border-b">
//               <div>📍</div>
//               <div>
//                 <div className="text-sm font-medium">Sundar Marg, Pokhara</div>
//                 <div className="text-xs text-gray-400">Nepal</div>
//               </div>
//             </div>

//             <div className="flex gap-4 px-5 py-4 border-b">
//               <div>📞</div>
//               <div>
//                 <div className="text-sm font-medium">061-576880</div>
//               </div>
//             </div>

//             <div className="flex gap-4 px-5 py-4 border-b">
//               <div>🕐</div>
//               <div>
//                 <div className="text-sm font-medium">
//                   Sunday – Friday: 9AM – 6PM
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 px-5 py-4">
//               <div>📦</div>
//               <div>
//                 <div className="text-sm font-medium">
//                   Hardware Products Available
//                 </div>
//               </div>
//             </div>

//           </div>

//           <Link
//             to="/products"
//             className="mt-5 block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl"
//           >
//             View Products →
//           </Link>

//         </div>

//       </div>

//       {/* FOOTER */}
//       <footer className="bg-gray-800 mt-6">
//         <div className="max-w-5xl mx-auto px-6 py-8 flex justify-between text-gray-400 text-xs">
//           <div>
//             <div className="text-white font-semibold">Shrestha Suppliers</div>
//             <div>Hardware Management System</div>
//           </div>
//           <div className="text-right">
//             <div>Sundar Marg, Pokhara, Nepal</div>
//             <div>061-576880,9856020610</div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }

// export default Home;






// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

// function Home() {
//   const images = ["/images/sink.jpg", "/images/showroom.jpg"];
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <Navbar />

//       {/* ── HERO ── */}
//       <div style={s.hero}>
//         <div style={s.heroLeft}>
//           <span style={s.heroLabel}>Pokhara, Nepal</span>
//           <h1 style={s.heroTitle}>
//             Your trusted source for{" "}
//             <span style={{ color: "#2563eb" }}>hardware fittings</span>
//           </h1>
//           <p style={s.heroSub}>
//             Quality bathroom and kitchen fittings for homes and businesses.
//             Serving Pokhara with genuine products and fair prices.
//           </p>
//           <div style={s.heroBtns}>
//             <Link to="/products" style={s.btnPrimary}>
//               View Products →
//             </Link>
//             <a href="#contact" style={s.btnSecondary}>
//               Contact Us
//             </a>
//           </div>
//         </div>

//         <div style={s.heroImgWrap}>
//           <img
//             src={images[current]}
//             alt="Shrestha Suppliers showroom"
//             style={s.heroImg}
//           />
//         </div>
//       </div>

//       {/* ── STATS BAR ── */}
//       <div style={s.statsBar}>
//         {[
//           { num: "15+", lbl: "Products in stock" },
//           { num: "3000+", lbl: "Units available" },
//           { num: "2", lbl: "Product categories" },
//         ].map((stat, i) => (
//           <div
//             key={i}
//             style={{
//               ...s.statItem,
//               borderRight: i < 2 ? "0.5px solid #e5e7eb" : "none",
//             }}
//           >
//             <div style={s.statNum}>{stat.num}</div>
//             <div style={s.statLbl}>{stat.lbl}</div>
//           </div>
//         ))}
//       </div>

//       {/* ── ABOUT ── */}
//       <div style={s.section}>
//         <div style={s.sectionLabel}>About us</div>
//         <div style={s.sectionTitle}>Why choose Shrestha Suppliers?</div>
//         <div style={s.sectionSub}>
//           Everything you need for your bathroom and kitchen, under one roof
//         </div>

//         <div style={s.aboutGrid}>
//           {[
//             {
//               title: "Quality products",
//               text: "We stock only genuine hardware fittings — sink mixers, basin sets, towel rods, soap dispensers and more.",
//               icon: (
//                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                   <circle
//                     cx="9"
//                     cy="9"
//                     r="7"
//                     stroke="#2563eb"
//                     strokeWidth="1.5"
//                   />
//                   <path
//                     d="M6 9l2 2 4-4"
//                     stroke="#2563eb"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               ),
//             },
//             {
//               title: "Trusted local store",
//               text: "Based in Sundar Marg, Pokhara — serving local homes and businesses with fair prices and honest service.",
//               icon: (
//                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                   <path
//                     d="M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"
//                     stroke="#2563eb"
//                     strokeWidth="1.5"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               ),
//             },
//             {
//               title: "Digital inventory",
//               text: "Our smart system tracks stock in real time so you always know what's available before you visit.",
//               icon: (
//                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                   <rect
//                     x="2"
//                     y="2"
//                     width="14"
//                     height="14"
//                     rx="3"
//                     stroke="#2563eb"
//                     strokeWidth="1.5"
//                   />
//                   <path
//                     d="M6 9h6M9 6v6"
//                     stroke="#2563eb"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               ),
//             },
//           ].map((card, i) => (
//             <div key={i} style={s.aboutCard}>
//               <div style={s.aboutIcon}>{card.icon}</div>
//               <p style={s.aboutCardTitle}>{card.title}</p>
//               <p style={s.aboutCardText}>{card.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── CONTACT + CTA ── */}
//       <div id="contact" style={s.contactSection}>
//         <div style={s.contactInner}>
//           {/* Contact info */}
//           <div>
//             <div style={s.sectionLabel}>Find us</div>
//             <div style={s.sectionTitle}>Shop information</div>
//             <div style={{ ...s.sectionSub, marginBottom: "20px" }}>
//               Visit us or get in touch
//             </div>
//             <div style={s.contactList}>
//               {[
//                 {
//                   icon: "📍",
//                   label: "Address",
//                   val: "Sundar Marg, Pokhara, Nepal",
//                 },
//                 { icon: "📞", label: "Phone", val: "061-576880 · 9856020610" },
//                 {
//                   icon: "🕐",
//                   label: "Opening hours",
//                   val: "Sunday – Friday: 9AM – 6PM",
//                 },
//                 {
//                   icon: "📦",
//                   label: "Products",
//                   val: "Bathroom & Kitchen Fittings",
//                 },
//               ].map((row, i, arr) => (
//                 <div
//                   key={i}
//                   style={{
//                     ...s.contactRow,
//                     borderBottom:
//                       i < arr.length - 1 ? "0.5px solid #f3f4f6" : "none",
//                   }}
//                 >
//                   <div style={s.contactIcon}>{row.icon}</div>
//                   <div>
//                     <div style={s.contactLabel}>{row.label}</div>
//                     <div style={s.contactVal}>{row.val}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CTA card */}
//           <div style={s.ctaCard}>
//             <p style={s.ctaTitle}>Browse our full product range</p>
//             <p style={s.ctaSub}>
//               Search and filter products by category. See live stock levels
//               before you visit the store.
//             </p>
//             <Link to="/products" style={s.ctaBtn}>
//               View Products →
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* ── FOOTER ── */}
//       <footer style={s.footer}>
//         <div>
//           <div style={s.footerBrand}>Shrestha Suppliers</div>
//           <div style={s.footerSub}>Hardware Management System · Pokhara</div>
//         </div>
//         <div
//           style={{
//             textAlign: "right",
//             color: "#9ca3af",
//             fontSize: "12px",
//             lineHeight: 1.8,
//           }}
//         >
//           <div>Sundar Marg, Pokhara, Nepal</div>
//           <div>061-576880 · 9856020610</div>
//         </div>
//       </footer>
//     </>
//   );
// }

// const s = {
//   hero: {
//     background: "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)",
//     padding: "72px 40px 64px",
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "48px",
//     alignItems: "center",
//   },
//   heroLeft: { display: "flex", flexDirection: "column" },
//   heroLabel: {
//     display: "inline-block",
//     fontSize: "11px",
//     fontWeight: 500,
//     background: "#dbeafe",
//     color: "#1e40af",
//     padding: "4px 12px",
//     borderRadius: "20px",
//     marginBottom: "16px",
//     width: "fit-content",
//   },
//   heroTitle: {
//     fontSize: "34px",
//     fontWeight: 700,
//     color: "#111827",
//     lineHeight: 1.25,
//     marginBottom: "14px",
//   },
//   heroSub: {
//     fontSize: "15px",
//     color: "#6b7280",
//     lineHeight: 1.7,
//     marginBottom: "28px",
//   },
//   heroBtns: { display: "flex", gap: "12px", alignItems: "center" },
//   btnPrimary: {
//     background: "#2563eb",
//     color: "white",
//     padding: "11px 24px",
//     borderRadius: "10px",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: 500,
//     textDecoration: "none",
//     display: "inline-block",
//   },
//   btnSecondary: {
//     background: "white",
//     color: "#374151",
//     padding: "11px 24px",
//     borderRadius: "10px",
//     border: "1px solid #d1d5db",
//     cursor: "pointer",
//     fontSize: "14px",
//     textDecoration: "none",
//     display: "inline-block",
//   },
//   heroImgWrap: {
//     background: "white",
//     borderRadius: "16px",
//     border: "0.5px solid #e5e7eb",
//     overflow: "hidden",
//     height: "360px",
//   },
//   heroImg: { width: "100%", height: "100%", objectFit: "cover" },

//   statsBar: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3,1fr)",
//     borderTop: "0.5px solid #e5e7eb",
//     borderBottom: "0.5px solid #e5e7eb",
//     background: "white",
//   },
//   statItem: { padding: "28px 0", textAlign: "center" },
//   statNum: {
//     fontSize: "28px",
//     fontWeight: 700,
//     color: "#1e40af",
//     marginBottom: "4px",
//   },
//   statLbl: { fontSize: "12px", color: "#9ca3af" },

//   section: { padding: "64px 40px" },
//   sectionLabel: {
//     fontSize: "11px",
//     fontWeight: 500,
//     color: "#2563eb",
//     textTransform: "uppercase",
//     letterSpacing: "0.05em",
//     marginBottom: "8px",
//   },
//   sectionTitle: {
//     fontSize: "22px",
//     fontWeight: 600,
//     color: "#111827",
//     marginBottom: "6px",
//   },
//   sectionSub: { fontSize: "14px", color: "#9ca3af", marginBottom: "32px" },
//   aboutGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, minmax(0,1fr))",
//     gap: "16px",
//   },
//   aboutCard: {
//     background: "white",
//     border: "0.5px solid #e5e7eb",
//     borderRadius: "12px",
//     padding: "20px",
//   },
//   aboutIcon: {
//     width: "36px",
//     height: "36px",
//     borderRadius: "8px",
//     background: "#eff6ff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: "12px",
//   },
//   aboutCardTitle: {
//     fontSize: "13px",
//     fontWeight: 500,
//     color: "#111827",
//     marginBottom: "6px",
//   },
//   aboutCardText: { fontSize: "12px", color: "#6b7280", lineHeight: 1.6 },

//   contactSection: {
//     background: "#f8fafc",
//     borderTop: "0.5px solid #e5e7eb",
//     borderBottom: "0.5px solid #e5e7eb",
//   },
//   contactInner: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "48px",
//     padding: "64px 40px",
//     alignItems: "start",
//   },
//   contactList: {
//     background: "white",
//     border: "0.5px solid #e5e7eb",
//     borderRadius: "12px",
//     overflow: "hidden",
//   },
//   contactRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "14px",
//     padding: "16px 20px",
//   },
//   contactIcon: {
//     width: "34px",
//     height: "34px",
//     borderRadius: "8px",
//     background: "#eff6ff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexShrink: 0,
//     fontSize: "14px",
//   },
//   contactLabel: { fontSize: "11px", color: "#9ca3af", marginBottom: "2px" },
//   contactVal: { fontSize: "13px", fontWeight: 500, color: "#111827" },

//   ctaCard: {
//     background: "#1e40af",
//     borderRadius: "16px",
//     padding: "40px 36px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//   },
//   ctaTitle: {
//     fontSize: "20px",
//     fontWeight: 600,
//     color: "white",
//     marginBottom: "10px",
//   },
//   ctaSub: {
//     fontSize: "13px",
//     color: "rgba(255,255,255,0.75)",
//     marginBottom: "24px",
//     lineHeight: 1.6,
//   },
//   ctaBtn: {
//     background: "white",
//     color: "#1e40af",
//     fontSize: "13px",
//     fontWeight: 600,
//     padding: "10px 22px",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//     textDecoration: "none",
//     display: "inline-block",
//     width: "fit-content",
//   },

//   footer: {
//     background: "#1e293b",
//     padding: "40px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   footerBrand: {
//     color: "white",
//     fontSize: "14px",
//     fontWeight: 600,
//     marginBottom: "4px",
//   },
//   footerSub: { color: "#9ca3af", fontSize: "12px" },
// };

// export default Home;






import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Home() {
  const images = ["/images/sink.jpg", "/images/showroom.jpg"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#fff" }}
    >
      <Navbar />

      {/* ── HERO ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)",
          padding: "72px 40px 64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 500,
              background: "#dbeafe",
              color: "#1e40af",
              padding: "4px 14px",
              borderRadius: "20px",
              marginBottom: "18px",
            }}
          >
            Pokhara, Nepal
          </span>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.2,
              marginBottom: "14px",
            }}
          >
            Your trusted source for{" "}
            <span style={{ color: "#2563eb" }}>hardware fittings</span>
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "#6b7280",
              lineHeight: 1.7,
              marginBottom: "28px",
            }}
          >
            Quality bathroom and kitchen fittings for homes and businesses.
            Serving Pokhara with genuine products and fair prices.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link
              to="/products"
              style={{
                background: "#2563eb",
                color: "white",
                padding: "12px 26px",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              View Products →
            </Link>
            <a
              href="#contact"
              style={{
                background: "white",
                color: "#374151",
                padding: "12px 26px",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "14px",
                border: "1px solid #d1d5db",
              }}
            >
              Contact Us
            </a>
          </div>
        </div>

        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            height: "380px",
            border: "0.5px solid #e5e7eb",
          }}
        >
          <img
            src={images[current]}
            alt="Shrestha Suppliers showroom"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "0.5px solid #e5e7eb",
          borderBottom: "0.5px solid #e5e7eb",
          background: "white",
        }}
      >
        {[
          { num: "15+", lbl: "Products in stock" },
          { num: "3000+", lbl: "Units available" },
          { num: "2", lbl: "Product categories" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "28px 0",
              textAlign: "center",
              borderRight: i < 2 ? "0.5px solid #e5e7eb" : "none",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#1e40af",
                marginBottom: "4px",
              }}
            >
              {stat.num}
            </div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>{stat.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT SECTION ── */}
      <div style={{ padding: "72px 40px", background: "#fff" }}>
        <div style={{ marginBottom: "40px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#2563eb",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            About us
          </span>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#111827",
              margin: "8px 0 8px",
            }}
          >
            Why choose Shrestha Suppliers?
          </h2>
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>
            Everything you need for your bathroom and kitchen, under one roof
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              icon: "🏪",
              title: "Who we are",
              text: "Shrestha Suppliers is a local hardware store based in Sundar Marg, Pokhara. We supply quality bathroom and kitchen fittings and many mores to homes and businesses across the region.",
            },
            {
              icon: "📦",
              title: "What we sell",
              text: "We stock different types of products like sink mixers, basin sets, towel rods, soap dispensers, PVC pipes, showers, and other essential hardware items — all genuine, all fairly priced.",
            },
            {
              icon: "💻",
              title: "Our digital system",
              text: "This system helps us manage inventory, track stock levels in real time, and maintain sales records digitally — so you always know what's available.",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: "white",
                border: "0.5px solid #e5e7eb",
                borderTop: "3px solid #2563eb",
                borderRadius: "14px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  marginBottom: "14px",
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "8px",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.7 }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTACT + CTA ── */}
      <div
        id="contact"
        style={{
          background: "#f8fafc",
          borderTop: "0.5px solid #e5e7eb",
          borderBottom: "0.5px solid #e5e7eb",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            padding: "72px 40px",
            alignItems: "start",
          }}
        >
          {/* Contact info */}
          <div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "#2563eb",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Find us
            </span>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
                margin: "8px 0 6px",
              }}
            >
              Shop information
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#9ca3af",
                marginBottom: "24px",
              }}
            >
              Visit us or get in touch
            </p>

            <div
              style={{
                background: "white",
                border: "0.5px solid #e5e7eb",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              {[
                {
                  icon: "📍",
                  label: "Address",
                  val: "Sundar Marg, Pokhara, Nepal",
                },
                { icon: "📞", label: "Phone", val: "061-576880 · 9856020610" },
                {
                  icon: "🕐",
                  label: "Opening hours",
                  val: "Sunday – Friday: 9AM – 6PM",
                },
                {
                  icon: "📦",
                  label: "Products",
                  val: "Bathroom & Kitchen Fittings",
                },
              ].map((row, i, arr) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "16px 20px",
                    borderBottom:
                      i < arr.length - 1 ? "0.5px solid #f3f4f6" : "none",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "#eff6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    {row.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        marginBottom: "2px",
                      }}
                    >
                      {row.label}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#111827",
                      }}
                    >
                      {row.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA card */}
          <div
            style={{
              background: "#1e40af",
              borderRadius: "16px",
              padding: "44px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                marginBottom: "20px",
              }}
            >
              🛒
            </div>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "white",
                marginBottom: "12px",
              }}
            >
              Browse our full product range
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "28px",
                lineHeight: 1.7,
              }}
            >
              Search and filter products by category. See live stock levels
              before you visit the store.
            </p>
            <Link
              to="/products"
              style={{
                background: "white",
                color: "#1e40af",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px 24px",
                borderRadius: "10px",
                textDecoration: "none",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              View Products →
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#1e293b",
          padding: "36px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              color: "white",
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "4px",
            }}
          >
            Shrestha Suppliers
          </div>
          <div style={{ color: "#9ca3af", fontSize: "12px" }}>
            Hardware Management System · Pokhara
          </div>
        </div>
        <div
          style={{
            textAlign: "right",
            color: "#9ca3af",
            fontSize: "12px",
            lineHeight: 1.8,
          }}
        >
          <div>Sundar Marg, Pokhara, Nepal</div>
          <div>061-576880 · 9856020610</div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
