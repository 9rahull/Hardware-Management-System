import { useState } from "react";



function ContactUs() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;

    setSent(true);
  };

  return (
    <div
      id="contact-us"
      style={{
        borderTop: "0.5px solid #e5e7eb",
        padding: "64px 40px",
        background: "#fff",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        {/* Heading */}
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "#2563eb",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Contact us
        </span>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#111827",
            margin: "8px 0 6px",
          }}
        >
          Send us a message
        </h2>
        <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "28px" }}>
          Have a question or inquiry? We'll get back to you soon.
        </p>

        {sent ? (
          /* Success state */
          <div
            style={{
              background: "#f0fdf4",
              border: "0.5px solid #bbf7d0",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>✓</div>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#15803d",
                margin: 0,
              }}
            >
              Message sent!
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
              We'll contact you at {phone || "the number you provided"}.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setName("");
                setPhone("");
                setMessage("");
              }}
              style={{
                marginTop: "16px",
                padding: "8px 20px",
                border: "0.5px solid #e5e7eb",
                borderRadius: "8px",
                background: "white",
                fontSize: "13px",
                cursor: "pointer",
                color: "#374151",
              }}
            >
              Send another
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div>
                <label style={label}>Your name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ram Bahadur"
                  required
                  style={inp}
                />
              </div>
              <div>
                <label style={label}>Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  style={inp}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={label}>Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What can we help you with?"
                required
                rows={4}
                style={{ ...inp, resize: "none", height: "auto" }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "11px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const label = {
  display: "block",
  fontSize: "12px",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "5px",
};

const inp = {
  width: "100%",
  padding: "9px 12px",
  border: "0.5px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "13px",
  fontFamily: "inherit",
  color: "#111827",
  outline: "none",
  background: "white",
};

export default ContactUs;
