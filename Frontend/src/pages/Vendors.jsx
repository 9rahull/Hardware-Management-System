import { useEffect, useState } from "react";

function Vendors() {
  const [vendors, setVendors] = useState([]);

  // ✅ FORM STATE
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // ✅ FETCH VENDORS
  const fetchVendors = () => {
    fetch("http://127.0.0.1:8000/api/vendors/")
      .then(res => res.json())
      .then(data => setVendors(data));
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // ✅ ADD VENDOR
  const handleAddVendor = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/vendors/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address
      })
    });

    if (res.ok) {
      alert("Vendor added successfully!");

      // reset form
      setName("");
      setPhone("");
      setAddress("");

      fetchVendors(); // refresh list
    } else {
      alert("Failed to add vendor");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Vendors</h1>

      {/* ✅ ADD VENDOR FORM */}
      <form onSubmit={handleAddVendor} className="mb-8 space-y-3 bg-white p-4 rounded shadow">
        
        <input
          type="text"
          placeholder="Vendor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Vendor
        </button>
      </form>

      {/* ✅ VENDOR LIST */}
      <div className="grid grid-cols-3 gap-4">
        {vendors.map(v => (
          <div key={v.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{v.name}</h3>
            <p className="text-sm text-gray-500">📞 {v.phone}</p>
            <p className="text-sm text-gray-500">📍 {v.address}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Vendors;