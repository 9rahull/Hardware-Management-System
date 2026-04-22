import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ContactUs from "./ContactUs";

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
