import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="p-6 bg-[#f9f5e7] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">{stats.total_products}</h2>
          <p>Total Products</p>
        </div>

        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">{stats.total_stock}</h2>
          <p>Total Stock</p>
        </div>

        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">{stats.low_stock}</h2>
          <p>Low Stock</p>
        </div>

        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold">Rs. {stats.total_value}</h2>
          <p>Total Value</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;