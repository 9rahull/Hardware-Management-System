import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white px-8 py-4 flex justify-between items-center border-b border-gray-200">

      {/* Brand */}
      <Link to="/" className="text-xl font-bold text-gray-900">
        Shrestha <span className="text-blue-600">Suppliers</span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-500 hover:text-gray-900 text-sm font-medium transition"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="text-gray-500 hover:text-gray-900 text-sm font-medium transition"
        >
          View Products
        </Link>

        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
        >
          Staff Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;
