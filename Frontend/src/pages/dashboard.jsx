import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [recentProducts, setRecentProducts] = useState([]);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // protect route
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/login");
  }, []);

  // fetch dashboard stats + recent products
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        if (data.recent_products) {
          setRecentProducts(data.recent_products);
        } else {
          fetch("http://127.0.0.1:8000/api/products/?page=1")
            .then((res) => res.json())
            .then((productData) => {
              const all = productData.results || productData;
              setRecentProducts(all.slice(0, 5));
            });
        }
      })
      .catch(() => {
        setStats({});
        setRecentProducts([]);
      });
  }, []);

  // stock color
  const stockColor = (stock) => {
    if (stock <= 10) return "text-red-600 font-semibold";
    if (stock <= 50) return "text-orange-500 font-semibold";
    return "text-green-600 font-semibold";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Page title */}
      <h1 className="text-xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Welcome back, {username}</p>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.total_products ?? "-"}
          </div>
          <div className="text-sm text-gray-500">Total Products</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.total_stock ?? "-"}
          </div>
          <div className="text-sm text-gray-500">Total Stock</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div
            className={`text-3xl font-bold mb-1 ${stats.low_stock > 0 ? "text-orange-500" : "text-gray-900"}`}
          >
            {stats.low_stock ?? "-"}
          </div>
          <div className="text-sm text-gray-500">Low Stock</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-xl font-bold text-gray-900 mb-1">
            Rs{" "}
            {stats.total_value
              ? Number(stats.total_value).toLocaleString()
              : "-"}
          </div>
          <div className="text-sm text-gray-500">Total Value</div>
        </div>
      </div>

      {/* RECENT PRODUCTS TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">
            Recent Products
          </h3>
          <button
            onClick={() => navigate("/manage-products")}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            View All →
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Image
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Name
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Category
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Price
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {recentProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-400 text-sm"
                >
                  No products found
                </td>
              </tr>
            ) : (
              recentProducts.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-lg">🔧</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">
                    {p.name}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        p.category === "Kitchen Fittings"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-700">
                    Rs {Number(p.price).toLocaleString()}
                  </td>
                  <td className={`px-5 py-3 text-sm ${stockColor(p.stock)}`}>
                    {p.stock}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-5 py-3 border-t border-gray-100 text-center text-xs text-gray-400">
          Showing 5 most recent products · Click "View All" to see all products
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
