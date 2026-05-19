import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaChartBar, FaBoxes, FaShoppingCart, FaBoxOpen, FaUsers } from "react-icons/fa";
import { adminApi } from "../../api/axiosInstance";

// Sub-components
import DashboardOverview from "./DashboardOverview";
import ProductsManager   from "./ProductsManager";
import CategoriesManager from "./CategoriesManager";
import OrdersManager     from "./OrdersManager";
import UsersManager      from "./UsersManager";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [categories, setCategories] = useState([]);
  const [orders, setOrders]         = useState([]);
  const [stats, setStats]           = useState({ totalOrders: 0, totalRevenue: 0, ordersByStatus: [] });



  const fetchCategories = async () => {
    try {
      const { data } = await adminApi.get("/admin/categories");
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await adminApi.get("/admin/orders");
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await adminApi.get("/admin/stats");
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchOrders();
    fetchStats();
  }, []);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await adminApi.put(`/admin/orders/${orderId}/status`, { status });
      fetchOrders();
      fetchStats();
    } catch {
      alert("Failed to update order status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#8E1C9D] text-white flex flex-col pt-6 hidden md:flex shadow-xl">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold tracking-wider">Glowra Admin</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: "dashboard",  icon: <FaChartBar />,    label: "Dashboard"   },
            { id: "products",   icon: <FaBoxOpen />,     label: "Products"    },
            { id: "categories", icon: <FaBoxes />,       label: "Categories"  },
            { id: "orders",     icon: <FaShoppingCart />,label: "Orders"      },
            { id: "users",      icon: <FaUsers />,       label: "Users"       },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition shadow-sm ${
                activeTab === tab.id ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-white text-[#8E1C9D] font-bold hover:bg-gray-100 transition shadow-md"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center md:hidden">
          <h2 className="text-xl font-bold text-[#8E1C9D]">Admin Panel</h2>
          <button onClick={handleLogout} className="text-[#8E1C9D]">
            <FaSignOutAlt size={20} />
          </button>
        </header>

        <div className="p-6 md:p-10 flex-1 overflow-y-auto">
          {activeTab === "dashboard"  && <DashboardOverview stats={stats} />}
          {activeTab === "products"   && <ProductsManager />}
          {activeTab === "categories" && <CategoriesManager categories={categories} onRefresh={fetchCategories} />}
          {activeTab === "orders"     && <OrdersManager orders={orders} onUpdate={handleUpdateOrderStatus} />}
          {activeTab === "users"      && <UsersManager />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
