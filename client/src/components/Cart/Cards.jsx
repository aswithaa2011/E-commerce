import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardContext from "./CardContext";
import AuthContext from "../Authentication/AuthContext";

const Cards = ({ products: propProducts }) => {
  const { addToCart, searchTerm, wishlistItems = [], toggleWishlist, products: contextProducts, loadingProducts } = useContext(CardContext);
  const { datas } = useContext(AuthContext);
  const navigate = useNavigate();

  const displayProducts = propProducts || contextProducts;

  const filteredProducts = displayProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleAddToCart = (item) => {
    if (!datas?.status) {
      alert("Please login or sign in first");
      navigate("/login");
      return;
    }
    addToCart(item);
    alert("Item added to cart");
  };

  const getProductId = (product) => product._id || encodeURIComponent(product.name);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Trending Beauty Picks</h2>
          <p className="mt-2 text-sm text-gray-500">Add your favorites and review them in a modern cart view.</p>
        </div>
      </div>

      {loadingProducts ? (
        <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-16 text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-700"></div>
          <p className="text-sm text-gray-400">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No products found for &quot;{searchTerm}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((e) => (
            <div
              key={e._id || e.name}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={e.img}
                  onClick={() => navigate(`/product/${getProductId(e)}`)}
                  className="h-64 w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105"
                  alt={e.name}
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-700 shadow">
                  {e.percent}
                </span>
              </div>

              <div className="p-4">
                <h1 className="line-clamp-2 min-h-12 text-sm font-semibold text-gray-800">
                  {e.name}
                </h1>

                <div className="mt-3 flex items-center gap-2">
                  <p className="text-lg font-bold text-gray-900">Rs. {e.price}</p>
                  <del className="text-sm text-gray-400">Rs. {e.offprice}</del>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => handleAddToCart(e)}
                    className="flex-1 rounded-full bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-800"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(e)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
                      wishlistItems.some((item) => (item._id && item._id === e._id) || item.name === e.name)
                        ? "border-pink-500 bg-pink-50 text-pink-500 text-xl"
                        : "border-gray-200 bg-white text-gray-600 text-[21px] hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500"
                    }`}
                  >
                    {wishlistItems.some((item) => (item._id && item._id === e._id) || item.name === e.name)
                      ? <FaHeart />
                      : <CiHeart />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
