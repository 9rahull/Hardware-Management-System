import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [recentProducts, setRecentProducts] = useState([]);

  // 🔔 NOTIFICATION STATE
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

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
      });
  }, []);

  // 🔔 FETCH NOTIFICATIONS
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/notifications/")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  // stock color
  const stockColor = (stock) => {
    if (stock <= 10) return "text-red-600 font-semibold";
    if (stock <= 50) return "text-orange-500 font-semibold";
    return "text-green-600 font-semibold";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* 🔥 HEADER WITH BELL */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {username}</p>
        </div>

        {/* 🔔 NOTIFICATION BELL */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer relative"
          >
            <Bell size={22} />

            {/* 🔴 BADGE */}
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[2px] rounded-full">
                {notifications.length}
              </span>
            )}
          </div>

          {/* 📩 DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-lg z-50">
              <div className="p-3 border-b font-semibold text-sm">
                🔔 Notifications
              </div>

              {notifications.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No alerts</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 border-b text-sm hover:bg-gray-50"
                  >
                    🔴 {n.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border rounded-xl p-5 text-center">
          <div className="text-3xl font-bold">
            {stats.total_products ?? "-"}
          </div>
          <div className="text-sm text-gray-500">Total Products</div>
        </div>

        <div className="bg-white border rounded-xl p-5 text-center">
          <div className="text-3xl font-bold">{stats.total_stock ?? "-"}</div>
          <div className="text-sm text-gray-500">Total Stock</div>
        </div>

        <div className="bg-white border rounded-xl p-5 text-center">
          <div
            className={`text-3xl font-bold ${stats.low_stock > 0 ? "text-orange-500" : ""}`}
          >
            {stats.low_stock ?? "-"}
          </div>
          <div className="text-sm text-gray-500">Low Stock</div>
        </div>

        <div className="bg-white border rounded-xl p-5 text-center">
          <div className="text-xl font-bold">
            Rs{" "}
            {stats.total_value
              ? Number(stats.total_value).toLocaleString()
              : "-"}
          </div>
          <div className="text-sm text-gray-500">Total Value</div>
        </div>
      </div>

      {/* RECENT PRODUCTS TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h3 className="font-semibold">Recent Products</h3>
          <button
            onClick={() => navigate("/manage-products")}
            className="text-sm text-blue-600 hover:underline"
          >
            View All →
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
              <th className="px-5 py-3 text-left">Image</th>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Category</th>
              <th className="px-5 py-3 text-left">Price</th>
              <th className="px-5 py-3 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>
            {recentProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              recentProducts.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3">
                    {p.image ? (
                      <img src={p.image} className="w-10 h-10 object-contain" />
                    ) : (
                      "🔧"
                    )}
                  </td>

                  <td className="px-5 py-3">{p.name}</td>

                  <td className="px-5 py-3">{p.category}</td>

                  <td className="px-5 py-3">
                    Rs {Number(p.price).toLocaleString()}
                  </td>

                  <td className={`px-5 py-3 ${stockColor(p.stock)}`}>
                    {p.stock}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
