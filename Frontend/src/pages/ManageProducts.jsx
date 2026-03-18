import { useEffect, useState } from "react";

function ManageProducts() {

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });


  // FETCH PRODUCTS
  const fetchProducts = () => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // DELETE PRODUCT
  const deleteProduct = (id) => {

    fetch(`http://127.0.0.1:8000/api/delete-product/${id}/`, {
      method: "DELETE",
    })
      .then(() => fetchProducts());
  };


  // START EDIT
  const startEdit = (product) => {

    setEditingProduct(product.id);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
  };


  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // UPDATE PRODUCT
  const updateProduct = (id) => {

    fetch(`http://127.0.0.1:8000/api/update-product/${id}/`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),

    })
      .then(() => {
        setEditingProduct(null);
        fetchProducts();
      });
  };


  return (

    <div style={{ padding: "40px" }}>

      <h1>Manage Products</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          textAlign: "center",
        }}
      >

        <thead>

          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>

              <td>

                {product.image && (

                  <img
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                    }}
                  />

                )}

              </td>


              <td>

                {editingProduct === product.id ? (

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                ) : (

                  product.name

                )}

              </td>


              <td>

                {editingProduct === product.id ? (

                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />

                ) : (

                  product.category

                )}

              </td>


              <td>

                {editingProduct === product.id ? (

                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />

                ) : (

                  `Rs ${product.price}`

                )}

              </td>


              <td>

                {editingProduct === product.id ? (

                  <input
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                  />

                ) : (

                  product.stock

                )}

              </td>


              <td>

                {editingProduct === product.id ? (

                  <button
                    onClick={() => updateProduct(product.id)}
                    style={{
                      background: "green",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>

                ) : (

                  <button
                    onClick={() => startEdit(product)}
                    style={{
                      background: "blue",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                )}

              </td>


              <td>

                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    background: "red",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ManageProducts;