import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const PaymentPage = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const { cartItems, totalPrice, totalItems } = location.state || {};

  const [address, setAddress] = useState({ street: "", city: "", state: "", pincode: "" });
  const [processing, setProcessing] = useState(false);
  const [method, setMethod] = useState("online"); // online | cod

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handleProceedToPay = async () => {
    if (!address.street || !address.city || !address.state || !address.pincode) {
      return alert("Please fill in your delivery address.");
    }
    setProcessing(true);

    try {
      const { data } = await api.post("/orders", {
        items: cartItems, 
        totalPrice, 
        totalItems,
        paymentMethod: method === "online" ? "Online" : "COD",
        paymentId: (method === "online" ? "ONL-" : "COD-") + Date.now(), 
        address,
      });
      navigate("/order-success", { state: { orderId: data.order.orderId } });
    } catch {
      alert("Order failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No items to pay for.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-6">

        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>

        {/* Address Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Delivery Address</h2>
          <input name="street" placeholder="Street / Flat / Area" value={address.street}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#8E1C9D] outline-none" />
          <div className="grid grid-cols-2 gap-3">
            <input name="city" placeholder="City" value={address.city}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#8E1C9D] outline-none" />
            <input name="state" placeholder="State" value={address.state}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#8E1C9D] outline-none" />
          </div>
          <input name="pincode" placeholder="Pincode" value={address.pincode}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#8E1C9D] outline-none" />
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
          {[
            { id: "online", label: "Pay Online (UPI / Card / Net Banking)", icon: "💳" },
            { id: "cod",    label: "Cash on Delivery",                       icon: "💵" },
          ].map((m) => (
            <label key={m.id}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                method === m.id ? "border-[#8E1C9D] bg-purple-50" : "border-gray-200"
              }`}
            >
              <input type="radio" name="method" value={m.id} checked={method === m.id}
                onChange={() => setMethod(m.id)} className="accent-[#8E1C9D]" />
              <span className="text-lg">{m.icon}</span>
              <span className="text-sm font-medium text-gray-800">{m.label}</span>
            </label>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-2">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-gray-700">
                <span>{item.name} × {item.quantity}</span>
                <span>Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span className="text-[#8E1C9D]">Rs. {totalPrice}</span>
          </div>
        </div>

        <button
          onClick={handleProceedToPay}
          disabled={processing}
          className="w-full rounded-full bg-[#8E1C9D] py-4 text-sm font-bold text-white shadow-lg hover:bg-[#7a1787] transition disabled:opacity-60"
        >
          {processing ? "Processing..." : "Proceed to Pay →"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
