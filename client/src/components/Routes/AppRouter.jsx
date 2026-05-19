import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import LoginPage from "../../pages/LoginPage";
import Layout from "../Layouts/Layout";
import ProtectedContext from "../Authentication/ProtectedContext";
import AdminProtectedRoute from "../Authentication/AdminProtectedRoute";
import CardsItems from "../Cart/CardsItems";
import AdminLogin from "../../pages/AdminPages/AdminLogin";
import Contact from "../../pages/Contact";
import AdminDashboard from "../../pages/AdminPages/AdminDashboard";
import Wishlist from "../../pages/Wishlist";
import Offers from "../../pages/Offers";
import About from "../../pages/About";
import ProductDetails from "../../pages/ProductDetails";
import AdminRegister from "../../pages/AdminPages/AdminRegister";
import MyOrders from "../../pages/MyOrders";
import PaymentPage   from "../../pages/PaymentPage";
import OrderSuccess  from "../../pages/OrderSuccess";


const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<ProtectedContext><CardsItems /></ProtectedContext>} />
        <Route path="/wishlist" element={<ProtectedContext><Wishlist /></ProtectedContext>} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/my-orders" element={<ProtectedContext><MyOrders /></ProtectedContext>} />
        <Route path="/payment"       element={<ProtectedContext><PaymentPage /></ProtectedContext>} />
        <Route path="/order-success" element={<ProtectedContext><OrderSuccess /></ProtectedContext>} />

      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route
        path="/admin/dashboard"
        element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>}
      />
    </Routes>
  );
};

export default AppRouter;
