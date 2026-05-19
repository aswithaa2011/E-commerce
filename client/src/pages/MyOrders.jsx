import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaClipboardCheck } from "react-icons/fa";
import api from "../api/axiosInstance";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my");
        setOrders(data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Token is invalid/expired
          localStorage.removeItem("auth");
          window.location.href = "/login";
        }
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-100 text-5xl text-purple-600 mb-6 shadow-sm">
            <FaBoxOpen />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">No Orders Yet</h2>
        <p className="mt-3 text-base text-gray-500 max-w-md text-center">
          You haven't placed any orders with us recently. Discover premium cosmetics and beauty tools!
        </p>
        <Link to="/" className="mt-8 rounded-full bg-purple-700 px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-purple-800 hover:shadow-purple-900/30">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">Order History</h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and discover similar products.
            </p>
          </div>
          {Array.isArray(orders) && orders.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all order history?")) {
                  localStorage.removeItem("userOrders");
                  setOrders([]);
                }
              }}
              className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-500 shadow-sm transition hover:bg-red-50 hover:text-red-600"
            >
              Clear History
            </button>
          )}
        </div>

        <div className="space-y-8">
          {Array.isArray(orders) && orders.map((order, idx) => (
            <div key={idx} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                
                {/* Order Header */}
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-5 sm:flex sm:items-center sm:justify-between">
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 w-full">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Order Placed</p>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {(order.createdAt || order.date) ? new Date(order.createdAt || order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown Date'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Price</p>
                            <p className="mt-1 text-sm font-bold text-purple-700">Rs. {order.totalPrice}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Order ID</p>
                            <p className="mt-1 text-sm font-medium text-gray-900">{order.orderId}</p>
                        </div>
                        <div className="text-left sm:text-right">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
                                <FaClipboardCheck /> {order.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Items Display */}
                <div className="px-6 py-6 border-b border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 mb-4">{order.totalItems || 0} Items Processed</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(order.items || []).map((item, id) => (
                            <li key={id} className="flex items-center gap-4 rounded-xl border border-gray-50 p-3 hover:bg-gray-50 transition">
                                <img src={item.img} alt={item.name} className="h-16 w-16 rounded-lg object-cover bg-gray-100" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Order Footer Actions */}
                <div className="bg-white px-6 py-4 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">
                        Track Delivery
                    </button>
                    <button className="flex-1 rounded-xl border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-gray-900">
                        View Invoice
                    </button>
                </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
