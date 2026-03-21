import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);
    setError("");

    fetch("http://127.0.0.1:8000/api/accounts/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", data.username);
          localStorage.setItem("is_admin", data.is_admin);
          navigate("/dashboard");
        } else {
          setError(data.message || "Invalid username or password.");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Server error. Please try again.");
      });
  };

  // login on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Back to home */}
      <div className="px-8 py-4">
        <Link
          to="/"
          className="text-sm text-gray-500 hover:text-blue-600 transition font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Login box */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm">

          {/* Title only — no subtitle */}
          <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Staff Login
          </h1>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2 mb-4 text-center">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
            />
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>
      </div>

    </div>
  );
}

export default Login;
