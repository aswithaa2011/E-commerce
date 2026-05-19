import { useContext } from "react";
import CardContext from "./CardContext";
import { Link, useNavigate } from "react-router-dom";

function CardsItems() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CardContext);
  const navigate = useNavigate();


  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    // Navigate to payment page, passing cart state
    navigate("/payment", {
      state: { cartItems, totalPrice, totalItems },
    });
  };


  // ── Cart View ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">My Cart</h1>
          <p className="mt-2 text-sm text-gray-500">
            {totalItems} item{totalItems !== 1 ? "s" : ""} saved in your bag
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
            <p className="mt-3 text-sm text-gray-500">Looks like you have not added anything yet.</p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-purple-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
            {/* Cart Items */}
            <div className="space-y-5">
              {cartItems.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-28 w-full rounded-2xl object-cover sm:w-28"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                    <p className="mt-1 text-sm text-gray-500">Premium beauty essential</p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1">
                        <button
                          onClick={() => updateQuantity(item._id || item.name, item.quantity - 1)}
                          className="text-gray-500 hover:text-purple-700 font-bold text-lg leading-none"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold text-gray-700 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id || item.name, item.quantity + 1)}
                          className="text-gray-500 hover:text-purple-700 font-bold text-lg leading-none"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-lg font-bold text-gray-900">Rs. {item.price * item.quantity}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id || item.name)}
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-3xl bg-gray-900 p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span>Rs. {totalPrice}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Delivery</span>
                  <span className="text-green-400">Free</span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>Rs. {totalPrice}</span>
                  </div>
                </div>
              </div>

              <button onClick={handleCheckout}
                className="mt-6 w-full rounded-full bg-[#8E1C9D] py-4 text-sm font-bold text-white shadow-md hover:shadow-lg transition">
                Buy Now →
              </button>


              <Link
                to="/"
                className="mt-3 block w-full rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardsItems;
