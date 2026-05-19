import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CardContext from "../components/Cart/CardContext";
import AuthContext from "../components/Authentication/AuthContext";
import { FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoReturnUpBack } from "react-icons/io5";
import api from "../api/axiosInstance";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, wishlistItems, toggleWishlist, products } = useContext(CardContext);
  const { datas } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Try fetching by MongoDB _id from API
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch {
        // Fallback: find in context products (handles static data)
        const found = products.find(
          (p) => p._id === id || encodeURIComponent(p.name) === id
        );
        setProduct(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, products]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="mt-2 text-gray-500">The beauty item you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 rounded-full bg-purple-600 px-6 py-2.5 text-white font-medium hover:bg-purple-700">
           Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!datas?.status) {
      alert("Please login or sign in first");
      navigate("/login");
      return;
    }
    addToCart(product);
    alert("Item added to cart");
  };

  const isFavorited = wishlistItems?.some(
    (item) => (item._id && item._id === product._id) || item.name === product.name
  );

  // Related products from context, excluding current
  const relatedProducts = products
    .filter((p) => (p._id ? p._id !== product._id : p.name !== product.name))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Breadcrumb Config */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Image Column */}
            <div className="relative group rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-8">
                {product.percent && (
                    <span className="absolute top-6 left-6 rounded-full bg-red-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg z-10">
                        {product.percent}
                    </span>
                )}
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-md z-10 text-[22px] transition hover:scale-110"
                >
                  {isFavorited ? <FaHeart className="text-pink-500" /> : <CiHeart className="text-gray-600" />}
                </button>
                <img 
                    src={product.img} 
                    alt={product.name} 
                    className="max-h-[500px] w-auto h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            {/* Info Column */}
            <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
                    {product.name}
                </h1>
                
                <div className="mt-6 flex items-baseline gap-4">
                    <p className="text-3xl font-black text-purple-700">Rs. {product.price}</p>
                    {product.offprice && (
                        <p className="text-lg font-semibold text-gray-400 line-through">Rs. {product.offprice}</p>
                    )}
                </div>

                <p className="mt-8 text-base text-gray-600 leading-relaxed">
                    Designed for flawless perfection. This premium formula enhances your natural beauty, leaving you with a radiant, long-lasting glow. Dermatologically tested and verified 100% cruelty-free. 
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 rounded-full bg-gray-900 px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-purple-700 hover:-translate-y-1 hover:shadow-purple-900/20"
                    >
                        Add to Cart
                    </button>
                </div>

                {/* Sub Features */}
                <div className="mt-12 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
                    <div className="flex items-center gap-3 text-gray-700">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                            <FaTruck />
                        </div>
                        <span className="text-sm font-semibold">Free Express Delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                            <IoReturnUpBack size={20} />
                        </div>
                        <span className="text-sm font-semibold">15 Days Easy Return</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                            <FaShieldAlt />
                        </div>
                        <span className="text-sm font-semibold">100% Authentic Product</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Related Products Scroller */}
        <div className="mt-32 pt-10 border-t border-gray-100">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rp) => (
                    <Link
                      to={`/product/${rp._id || encodeURIComponent(rp.name)}`}
                      key={rp._id || rp.name}
                      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-purple-200"
                    >
                        <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-50">
                            <img src={rp.img} alt={rp.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{rp.name}</h3>
                            <p className="mt-1 text-sm font-black text-purple-700">Rs. {rp.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
