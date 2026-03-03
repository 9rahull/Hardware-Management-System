import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDashboardData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-100 p-6 rounded shadow">
          Total Products: {data.total_products}
        </div>

        <div className="bg-gray-100 p-6 rounded shadow">
          Total Sales: {data.total_sales}
        </div>

        <div className="bg-gray-100 p-6 rounded shadow">
          Revenue: Rs. {data.total_revenue}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
