import { useState, useEffect } from "react";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // 🔄 FETCH VENDORS
  const fetchVendors = () => {
    fetch("http://127.0.0.1:8000/api/vendors/")
      .then((res) => res.json())
      .then((data) => setVendors(data));
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // ➕ ADD VENDOR
  const handleSubmit = () => {
    fetch("http://127.0.0.1:8000/api/vendors/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ name: "", phone: "", address: "" });
        fetchVendors();
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold mb-6">Vendor Management</h1>

      {/* 🔹 FORM */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Add Vendor</h2>

        <input
          placeholder="Vendor Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border p-2 mb-3 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Vendor
        </button>
      </div>

      {/* 🔹 VENDOR LIST */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-3">Vendor List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Address</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr key={v.id}>
                <td className="p-2 border">{v.name}</td>
                <td className="p-2 border">{v.phone}</td>
                <td className="p-2 border">{v.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vendors;
