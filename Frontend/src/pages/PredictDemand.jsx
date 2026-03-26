import { useState, useEffect } from "react";

function PredictDemand() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [prediction, setPrediction] = useState("");
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState("");

  // fetch products + stats
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setStats({}));

    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        const list = data.results || data;
        setProducts(list);
      })
      .catch(() => setProducts([]));
  }, []);

  // ✅ FIXED AI FUNCTION
  const handlePredict = async () => {
    setPredicting(true);
    setPrediction("");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict-demand/");
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        const formatted = data.predictions
          .map((p, i) => `Day ${i + 1}: ${p.toFixed(2)} units`)
          .join("\n");

        setPrediction(
          `📊 DEMAND FORECAST (Next 7 Days)\n\n${formatted}\n\n${data.message}`
        );
      }
    } catch (err) {
      setError("Failed to connect to backend");
    }

    setPredicting(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      <h1 className="text-xl font-bold mb-4">
        Market Demand Prediction
      </h1>

      {/* SUMMARY */}
      <div className="bg-white p-4 mb-4 rounded shadow">
        <p>Total Products: {stats.total_products}</p>
        <p>Total Stock: {stats.total_stock}</p>
        <p>Low Stock: {stats.low_stock}</p>
      </div>

      {/* BUTTON */}
      <button
        onClick={handlePredict}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {predicting ? "Analyzing..." : "Predict Demand"}
      </button>

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* RESULT */}
      {prediction && (
        <pre style={{ marginTop: "20px", background: "#f4f4f4", padding: "10px" }}>
          {prediction}
        </pre>
      )}

    </div>
  );
}

export default PredictDemand;