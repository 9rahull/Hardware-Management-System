import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ login success
        setError("");
        navigate("/dashboard");
      } else {
        // ❌ login failed
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9f5e7]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Staff Login
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Enter username"
          className="border p-2 w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 w-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;