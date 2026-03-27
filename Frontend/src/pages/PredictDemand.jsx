import { useState, useEffect } from "react";

function PredictDemand() {
  const [stats, setStats] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);

  // fetch dashboard stats
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats({}));
  }, []);

  // check stock
  const handleCheckStock = async () => {
    setLoading(true);
    setError("");
    setChecked(false);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/restock/");
      const result = await res.json();
      setData(result.recommendations);
      setChecked(true);
    } catch (err) {
      setError("Failed to fetch restock data. Please try again.");
    }

    setLoading(false);
  };

  // status helpers
  const getStatus = (priority) => {
    if (priority === 1) return { label: "Critical",   cls: "border-l-red-500",    badge: "bg-red-50 text-red-600 border border-red-200",    fill: "bg-red-500"    };
    if (priority === 2) return { label: "Low Stock",  cls: "border-l-orange-400", badge: "bg-orange-50 text-orange-600 border border-orange-200", fill: "bg-orange-400" };
    return                     { label: "Sufficient", cls: "border-l-green-500",  badge: "bg-green-50 text-green-600 border border-green-200",  fill: "bg-green-500"  };
  };

  const critCount = data.filter((p) => p.priority === 1).length;
  const lowCount  = data.filter((p) => p.priority === 2).length;
  const okCount   = data.filter((p) => p.priority === 3).length;

  // category counts from data
  const bathroomCount = data.filter((p) => p.category === "Bathroom Fittings").length;
  const kitchenCount  = data.filter((p) => p.category === "Kitchen Fittings").length;
  const totalCat      = bathroomCount + kitchenCount || 1;

  // pie chart SVG values
  const total    = data.length || 1;
  const circ     = 251;
  const okDash   = Math.round((okCount   / total) * circ);
  const lowDash  = Math.round((lowCount  / total) * circ);
  const critDash = Math.round((critCount / total) * circ);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      {/* Page title */}
      <h1 className="text-xl font-bold text-gray-900 mb-1">
        Smart Restock Recommendation
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Check which products need restocking based on current stock levels
      </p>

      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
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
          <div className={`text-3xl font-bold mb-1 ${stats.low_stock > 0 ? "text-orange-500" : "text-gray-900"}`}>
            {checked ? critCount + lowCount : (stats.low_stock ?? "-")}
          </div>
          <div className="text-sm text-gray-500">Low Stock Items</div>
        </div>
      </div>

      {/* CHECK BUTTON */}
      <button
        onClick={handleCheckStock}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition disabled:opacity-50 mb-6"
      >
        {loading ? "Checking..." : checked ? "Check Again" : "Check Stock"}
      </button>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* CHARTS — shown after check */}
      {checked && data.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">

            {/* BAR CHART — stock levels */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Stock Levels by Product</h3>
                <p className="text-xs text-gray-400 mt-0.5">Current units in stock</p>
              </div>
              <div className="px-5 py-4">
                {[...data]
                  .sort((a, b) => a.stock - b.stock)
                  .map((p, i) => {
                    const s = getStatus(p.priority);
                    const pct = Math.min(100, Math.round((p.stock / 300) * 100));
                    return (
                      <div key={i} className="flex items-center gap-3 mb-2.5 last:mb-0">
                        <div className="text-xs text-gray-600 w-28 flex-shrink-0 truncate" title={p.name}>
                          {p.name}
                        </div>
                        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.fill}`} style={{ width: `${pct}%` }} />
                        </div>
                        <div className="text-xs text-gray-500 w-8 text-right flex-shrink-0">
                          {p.stock}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* STATUS BREAKDOWN */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Stock Status Breakdown</h3>
                <p className="text-xs text-gray-400 mt-0.5">Overview of all products</p>
              </div>
              <div className="px-5 py-4">

                {/* Pie chart */}
                <div className="flex items-center justify-center gap-6 mb-5">
                  <svg width="100" height="100" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="40" fill="none" stroke="#22c55e" strokeWidth="20"
                      strokeDasharray={`${okDash} ${circ}`} strokeDashoffset="0"
                      transform="rotate(-90 55 55)" />
                    <circle cx="55" cy="55" r="40" fill="none" stroke="#f97316" strokeWidth="20"
                      strokeDasharray={`${lowDash} ${circ}`} strokeDashoffset={`-${okDash}`}
                      transform="rotate(-90 55 55)" />
                    <circle cx="55" cy="55" r="40" fill="none" stroke="#ef4444" strokeWidth="20"
                      strokeDasharray={`${critDash} ${circ}`} strokeDashoffset={`-${okDash + lowDash}`}
                      transform="rotate(-90 55 55)" />
                    <text x="55" y="51" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827" fontFamily="Poppins">{data.length}</text>
                    <text x="55" y="64" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="Poppins">products</text>
                  </svg>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></div>
                      Sufficient ({okCount})
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-400 flex-shrink-0"></div>
                      Low Stock ({lowCount})
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"></div>
                      Critical ({critCount})
                    </div>
                  </div>
                </div>

                {/* Category split */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    By Category
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-xs text-gray-600 w-28 flex-shrink-0">Bathroom Fittings</div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.round((bathroomCount / totalCat) * 100)}%` }} />
                    </div>
                    <div className="text-xs text-gray-500 w-4 text-right">{bathroomCount}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-600 w-28 flex-shrink-0">Kitchen Fittings</div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.round((kitchenCount / totalCat) * 100)}%` }} />
                    </div>
                    <div className="text-xs text-gray-500 w-4 text-right">{kitchenCount}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* PRODUCT LIST */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              All Products — Stock Status
            </h3>
            {data.map((p, i) => {
              const s = getStatus(p.priority);
              const pct = Math.min(100, Math.round((p.stock / 300) * 100));
              return (
                <div
                  key={i}
                  className={`bg-white border border-gray-200 border-l-4 ${s.cls} rounded-xl px-5 py-3 mb-2 flex items-center gap-4`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{p.name}</div>
                    {p.category && (
                      <div className="text-xs text-gray-400 mt-0.5">{p.category}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.fill}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 w-12">
                      {p.stock} units
                    </span>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${s.badge}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
}

export default PredictDemand;
