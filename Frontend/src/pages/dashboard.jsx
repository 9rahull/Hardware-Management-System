import Navbar from "../Navbar/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-3xl mt-2">1</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Total Sales</h2>
            <p className="text-3xl mt-2">9</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="text-3xl mt-2">Rs.1650</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
