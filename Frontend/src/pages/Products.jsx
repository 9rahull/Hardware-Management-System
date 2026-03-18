import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/delete-product/${id}/`, {
      method: "DELETE"
    });

    setProducts(products.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="p-6 bg-[#f9f5e7] min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 mb-6 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              
              <img
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.name}
                className="h-40 w-full object-cover mb-3"
              />

              <h2 className="font-bold">{product.name}</h2>
              <p>Category: {product.category}</p>
              <p>Price: Rs. {product.price}</p>
              <p>Stock: {product.stock}</p>

              <div className="mt-3 flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1">
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;