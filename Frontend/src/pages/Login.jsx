import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://127.0.0.1:8000/api/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // ✅ SAVE LOGIN
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", data.username);

          navigate("/dashboard");
        } else {
          setError(data.message);
        }
      })
      .catch(() => {
        setError("Server error");
      });
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Staff Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "10px",
          width: "300px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "10px",
          width: "300px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;