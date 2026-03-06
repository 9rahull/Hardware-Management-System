import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Hardware Products</h1>

        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t text-center">
                <td className="p-3">
                  <img
                    src="/products/connection-pipe.png"
                    alt="Connection Pipe"
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>

                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">Rs {product.price}</td>
                <td className="p-3">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
