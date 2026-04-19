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
import Vendors from "./pages/Vendors";
import NewSale from "./pages/NewSale";
import SaleReceipt from "./pages/SaleReceipt";
import Notifications from "./pages/Notifications";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── PUBLIC ROUTES (no sidebar) ── */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />{" "}
        {/* customer-facing */}
        <Route path="/about" element={<About />} /> {/*  public about page */}
        {/* ── STAFF PANEL (with sidebar) ── */}
        <Route element={<StaffLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/staff/products" element={<Products />} />{" "}
          {/*  staff view of products */}
          <Route path="/predict-demand" element={<PredictDemand />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/new-sale" element={<NewSale />} />
          <Route path="/sale-receipt/:id" element={<SaleReceipt />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
