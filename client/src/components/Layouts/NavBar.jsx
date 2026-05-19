// src/components/Layouts/NavBar.jsx
import logo1 from "../../assets/images/logo.svg";
import logo2 from "../../assets/images/lg2.gif";
import { CiHeart, CiSearch } from "react-icons/ci";
import { PiShoppingCartSimpleThin, PiSmileyMeltingLight } from "react-icons/pi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import AuthContext from "../Authentication/AuthContext";
import CardContext from "../Cart/CardContext";
import { FaUserCircle } from "react-icons/fa";
import { PRODUCTS } from "../../data/products";

const NavBar = () => {
  const { datas, setDatas } = useContext(AuthContext);
  const { cartItems, searchTerm, setSearchTerm, wishlistItems } = useContext(CardContext);
  const navigate = useNavigate();
  const [showSearchList, setShowSearchList] = useState(false);
  const searchRef = useRef(null);

  const totalCartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setDatas({ status: false });
    navigate("/login");
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return PRODUCTS.slice(0, 6);

    return PRODUCTS.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 8);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass =
    "relative text-[15px] font-semibold text-gray-700 transition duration-300 hover:text-purple-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-fit items-center gap-3">
          <img src={logo1} alt="logo" className="h-10 w-auto object-contain" />
          <img src={logo2} alt="logo animation" className="h-8 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          <Link to="/" className={navLinkClass}>HOME</Link>
          <Link to="/offers" className={navLinkClass}>OFFERS</Link>
          <Link to="/about" className={navLinkClass}>ABOUT</Link>
          <Link to="/contact" className={navLinkClass}>CONTACT</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div ref={searchRef} className="relative hidden md:block">
            <div className="flex h-11 w-[220px] items-center rounded-full border border-gray-200 bg-white px-3 text-gray-700 transition focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 lg:w-[260px]">
              <CiSearch className="text-xl text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchTerm.trim()) {
                    navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
                    setShowSearchList(false);
                  }
                }}
                onFocus={() => setShowSearchList(true)}
                placeholder="Search products..."
                className="w-full bg-transparent px-2 text-sm outline-none"
              />
            </div>


            {showSearchList && (
              <div className="absolute top-14 z-50 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                {filteredProducts.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-500">No matching products</p>
                ) : (
                  filteredProducts.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setSearchTerm(item.name);
                        setShowSearchList(false);
                        navigate("/");
                      }}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-purple-50"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">Rs. {item.price}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <Link to="/wishlist" className="relative hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[22px] text-gray-700 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500">
            <CiHeart />
            {wishlistItems?.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-bold text-white shadow-md">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[22px] text-gray-700 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          >
            <PiShoppingCartSimpleThin />
            {datas?.status && totalCartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-700 px-1 text-[11px] font-bold text-white shadow-md">
                {totalCartCount}
              </span>
            )}
          </Link>



          {datas?.status ? (
            <div className="relative group flex items-center gap-2 pl-1 cursor-pointer">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-violet-200 text-[24px] text-purple-700 shadow-sm ring-1 ring-purple-100 transition hover:scale-105">
                <FaUserCircle />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-12 hidden w-48 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:flex group-hover:opacity-100">
                <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-800">My Account</p>
                </div>
                <Link to="/my-orders" className="block px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-purple-50 hover:text-purple-700">
                    My Orders
                </Link>
                <Link to="/wishlist" className="block px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-purple-50 hover:text-purple-700">
                    My Activities
                </Link>
                <div className="border-t border-gray-50"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="rounded-full bg-linear-to-r from-purple-700 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:from-purple-800 hover:to-violet-700"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
