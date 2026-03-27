import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ManageProducts from "./pages/ManageProducts";
import StaffLayout from "./pages/StaffLayout";
import PredictDemand from "./pages/PredictDemand";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* STAFF PANEL WITH SIDEBAR */}
        <Route element={<StaffLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/products" element={<Products />} />   {/* ✅ MOVED HERE */}
          <Route path="/predict-demand" element={<PredictDemand />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;