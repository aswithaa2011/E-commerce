import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import CardContext from "../components/Cart/CardContext";

const OrderSuccess = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { clearCart } = useContext(CardContext);
  const orderId   = location.state?.orderId;

  useEffect(() => {
    clearCart();          // clear cart after success
  }, [clearCart]);

  if (!orderId) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-purple-100">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Payment Successful!</h1>
        <p className="mt-3 text-gray-500 text-sm leading-relaxed">
          Your order has been placed with <span className="font-bold text-[#8E1C9D]">Glowra Beauty</span>.<br />
          We'll send you a confirmation soon.
        </p>
        <div className="mt-5 rounded-xl bg-purple-50 border border-purple-100 px-4 py-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Order ID</p>
          <p className="text-lg font-black text-[#8E1C9D] tracking-wider mt-0.5">{orderId}</p>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <button onClick={() => navigate("/my-orders")}
            className="w-full rounded-full bg-[#8E1C9D] px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#7a1787]">
            View My Orders
          </button>
          <Link to="/" className="w-full rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
