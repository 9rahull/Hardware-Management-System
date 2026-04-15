function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        About Shrestha Suppliers
      </h1>

      <p className="text-gray-600 mb-8">
        Shrestha Suppliers is a hardware store based in Pokhara, Nepal. We
        provide high-quality bathroom and kitchen fittings. This system helps
        manage products, vendors, and sales efficiently.
      </p>

      {/* MISSION */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-600">
          Our goal is to simplify hardware store management using technology,
          making inventory tracking, sales recording, and analytics easier.
        </p>
      </div>

      {/* FEATURES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">System Features</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Inventory Management</h3>
            <p className="text-sm text-gray-500">
              Add, update, and manage products easily.
            </p>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Sales Recording</h3>
            <p className="text-sm text-gray-500">
              Record sales and automatically update stock.
            </p>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Low Stock Alerts</h3>
            <p className="text-sm text-gray-500">
              Get notified when stock is low.
            </p>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Demand Analytics</h3>
            <p className="text-sm text-gray-500">
              Analyze sales trends and predict demand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
