import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const pageSize = 6;

  const fetchProducts = (url = "http://127.0.0.1:8000/api/products/?page=1") => {
    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setTotalCount(data.count);

        const page = new URL(url).searchParams.get("page") || 1;
        setCurrentPage(Number(page));

        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(totalCount / pageSize);

  // 🔍 FILTER LOGIC (FRONTEND)
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || p.category === category)
  );

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Products</h1>

      {/* 🔍 SEARCH + FILTER */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={input}
        >
          <option value="">All Categories</option>
          <option>Bathroom Fittings</option>
          <option>Kitchen Fittings</option>
        </select>
      </div>

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <>
          <div style={grid}>
            {filteredProducts.map((p) => (
              <div key={p.id} style={card}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={img}
                />

                <h3>{p.name}</h3>
                <p style={{ color: "#666" }}>{p.category}</p>

                {/* 🔥 LOW STOCK ALERT */}
                {p.stock < 10 && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    Low Stock
                  </p>
                )}

                <p style={{ fontWeight: "bold" }}>Rs {p.price}</p>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            
            {prevPage && (
              <button onClick={() => fetchProducts(prevPage)} style={btn}>
                Prev
              </button>
            )}

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;

              return (
                <button
                  key={page}
                  onClick={() =>
                    fetchProducts(
                      `http://127.0.0.1:8000/api/products/?page=${page}`
                    )
                  }
                  style={{
                    ...btn,
                    background: currentPage === page ? "#2563eb" : "#333"
                  }}
                >
                  {page}
                </button>
              );
            })}

            {nextPage && (
              <button onClick={() => fetchProducts(nextPage)} style={btn}>
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* 🎨 STYLES */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "0.3s",
  cursor: "pointer"
};

const img = {
  width: "100%",
  height: "180px",
  objectFit: "contain",
  marginBottom: "10px"
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "200px"
};

const btn = {
  margin: "5px",
  padding: "8px 14px",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Products;