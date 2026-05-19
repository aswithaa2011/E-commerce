import { useContext } from "react";
import { Link } from "react-router-dom";
import CardContext from "../components/Cart/CardContext";
import { FaHeartBroken } from "react-icons/fa";

const Wishlist = () => {
  const { wishlistItems, toggleWishlist, addToCart } = useContext(CardContext);

  const handleMoveToCart = (item) => {
    addToCart(item);
    toggleWishlist(item); // Remove from wishlist when added to cart
    alert("Item moved to cart");
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-purple-50/50 to-white pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center md:text-left">
            My Wishlist
          </h2>
          <p className="mt-2 text-sm text-gray-500 text-center md:text-left">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} you love and saved for later.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-3xl text-pink-300 mb-4">
              <FaHeartBroken />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Your wishlist is empty</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
              You haven't added any products to your wishlist yet.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-pink-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 shadow-lg shadow-pink-200"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((e, i) => (
              <div
                key={i}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-pink-200"
              >
                <div>
                  <div className="relative overflow-hidden">
                    <img
                      src={e.img}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                      alt={e.name}
                    />
                    <button
                      onClick={() => toggleWishlist(e)}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-md backdrop-blur-md hover:bg-red-50 hover:text-red-600 transition"
                      title="Remove from wishlist"
                    >
                      &#10005;
                    </button>
                    {e.percent && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-pink-600 shadow-sm backdrop-blur-md">
                        {e.percent}
                      </span>
                    )}
                  </div>

                  <div className="p-5 pb-0">
                    <h1 className="line-clamp-2 min-h-12 text-sm font-bold text-gray-800">
                      {e.name}
                    </h1>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-lg font-extrabold text-gray-900">Rs. {e.price}</p>
                      {e.offprice && (
                        <del className="text-xs font-medium text-gray-400">Rs. {e.offprice}</del>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-4">
                  <button
                    onClick={() => handleMoveToCart(e)}
                    className="w-full rounded-2xl bg-purple-700 py-3 text-sm font-semibold text-white transition hover:bg-purple-800 hover:shadow-lg hover:shadow-purple-200"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
