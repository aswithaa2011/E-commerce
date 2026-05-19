import { createContext, useEffect, useState } from "react";
import api from "../../api/axiosInstance";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Persist cart & wishlist to localStorage
  useEffect(() => { localStorage.setItem("cartItems", JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems)); }, [wishlistItems]);

  // Fetch products from backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const { data } = await api.get("/products");
        let allProducts = data || [];
        
        // Also load static products to not lose the initial catalog
        try {
          const { PRODUCTS } = await import("../../data/products.js");
          allProducts = [...allProducts, ...PRODUCTS];
        } catch (fallbackErr) {
          console.error("Static import failed", fallbackErr);
        }
        
        setProducts(allProducts);
      } catch {
        // Fallback: use static products.js (local image imports) if DB fails completely
        try {
          const { PRODUCTS } = await import("../../data/products.js");
          setProducts(PRODUCTS);
        } catch (fallbackErr) {
          console.error("Static fallback also failed", fallbackErr);
        }
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => 
        (product._id && item._id === product._id) || 
        (!product._id && !item._id && item.name === product.name)
      );
      if (existing) {
        return prev.map((item) =>
          ((product._id && item._id === product._id) || (!product._id && !item._id && item.name === product.name))
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };


  const removeFromCart = (identifier) => {
    setCartItems((prev) => prev.filter((i) => i._id !== identifier && i.name !== identifier));
  };

  const updateQuantity = (identifier, qty) => {
    if (qty < 1) return removeFromCart(identifier);
    setCartItems((prev) =>
      prev.map((i) =>
        (i._id === identifier || i.name === identifier) ? { ...i, quantity: qty } : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => 
        (product._id && item._id === product._id) || 
        (!product._id && !item._id && item.name === product.name)
      );
      return exists
        ? prev.filter((item) => 
            (product._id && item._id !== product._id) || 
            (!product._id && item.name !== product.name)
          )
        : [...prev, product];
    });
  };


  return (
    <CardContext.Provider
      value={{
        cartItems, setCartItems, addToCart, removeFromCart, updateQuantity, clearCart,
        searchTerm, setSearchTerm,
        wishlistItems, toggleWishlist,
        products,
        loadingProducts,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
