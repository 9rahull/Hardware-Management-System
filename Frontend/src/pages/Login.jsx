import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");

        // redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Invalid Username or Password");
      }
    } catch (error) {
      alert("Server error. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f9f5e7]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Staff Login</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-4 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-5 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-2 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
