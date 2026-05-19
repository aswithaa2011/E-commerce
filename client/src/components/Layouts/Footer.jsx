import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import { FiTruck, FiCheckCircle } from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { HiOutlineTag } from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-sm font-semibold tracking-wide sm:text-base">
            BEAUTY BONANZA Get Your Amazing Deals!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:gap-6 sm:text-sm">
            <span>Get App</span>
            <span>Store & Events</span>
            <span>Gift Card</span>
            <span>Help</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-800 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
          <div>
            <h2 className="text-3xl font-extrabold lowercase tracking-tight text-purple-300">
              purplle
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-zinc-200">
              <li className="cursor-pointer hover:text-purple-300">Who are we?</li>
              <li className="cursor-pointer hover:text-purple-300">Careers</li>
              <li className="cursor-pointer hover:text-purple-300">Authenticity</li>
              <li className="cursor-pointer hover:text-purple-300">Press</li>
              <li className="cursor-pointer hover:text-purple-300">Testimonials</li>
              <li className="cursor-pointer hover:text-purple-300">Sustainability</li>
              <li className="cursor-pointer hover:text-purple-300">Investor Relations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">Help</h3>
            <ul className="mt-6 space-y-3 text-sm text-zinc-200">
              <li className="cursor-pointer hover:text-purple-300">Contact Us</li>
              <li className="cursor-pointer hover:text-purple-300">FAQs</li>
              <li className="cursor-pointer hover:text-purple-300">Store Locator</li>
              <li className="cursor-pointer hover:text-purple-300">Cancellation & Return</li>
              <li className="cursor-pointer hover:text-purple-300">Shipping & Delivery</li>
              <li className="cursor-pointer hover:text-purple-300">Sell on Purplle</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">Inspire Me</h3>
            <ul className="mt-6 space-y-3 text-sm text-zinc-200">
              <li className="cursor-pointer hover:text-purple-300">Beauty Book</li>
              <li className="cursor-pointer hover:text-purple-300">Games Board</li>
              <li className="cursor-pointer hover:text-purple-300">Buying Guides</li>
              <li className="cursor-pointer hover:text-purple-300">Skincare Tips</li>
              <li className="cursor-pointer hover:text-purple-300">Makeup Trends</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-6 space-y-3 text-sm text-zinc-200">
              <li className="cursor-pointer hover:text-purple-300">Offer Zone</li>
              <li className="cursor-pointer hover:text-purple-300">New Launches</li>
              <li className="cursor-pointer hover:text-purple-300">Purplle Fashion</li>
              <li className="cursor-pointer hover:text-purple-300">Purplle Pro</li>
              <li className="cursor-pointer hover:text-purple-300">Sitemap</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">Top Categories</h3>
            <ul className="mt-6 space-y-3 text-sm text-zinc-200">
              <li className="cursor-pointer hover:text-purple-300">Makeup</li>
              <li className="cursor-pointer hover:text-purple-300">Skin</li>
              <li className="cursor-pointer hover:text-purple-300">Hair</li>
              <li className="cursor-pointer hover:text-purple-300">Bath & Body</li>
              <li className="cursor-pointer hover:text-purple-300">Fragrance</li>
              <li className="cursor-pointer hover:text-purple-300">Natural</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-600 p-4 text-2xl text-white">
              <FiTruck />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-zinc-800">FREE SHIPPING</h4>
              <p className="mt-2 text-sm text-zinc-500">On Orders Above Rs.299</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-600 p-4 text-2xl text-white">
              <FiCheckCircle />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-zinc-800">EASY RETURNS</h4>
              <p className="mt-2 text-sm text-zinc-500">15-Day Return Policy</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-600 p-4 text-2xl text-white">
              <MdOutlineVerifiedUser />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-zinc-800">100% AUTHENTIC</h4>
              <p className="mt-2 text-sm text-zinc-500">Products Sourced Directly</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-600 p-4 text-2xl text-white">
              <HiOutlineTag />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-zinc-800">1900+ BRANDS</h4>
              <p className="mt-2 text-sm text-zinc-500">1.2 Lakh+ Products</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-zinc-800">
              Show us some love on social media
            </h4>
            <div className="mt-4 flex items-center gap-3 text-xl text-zinc-700">
              <a href="/" className="rounded-full border p-2 transition hover:border-purple-500 hover:text-purple-600"><FaInstagram /></a>
              <a href="/" className="rounded-full border p-2 transition hover:border-purple-500 hover:text-purple-600"><FaFacebookF /></a>
              <a href="/" className="rounded-full border p-2 transition hover:border-purple-500 hover:text-purple-600"><FaYoutube /></a>
              <a href="/" className="rounded-full border p-2 transition hover:border-purple-500 hover:text-purple-600"><FaXTwitter /></a>
              <a href="/" className="rounded-full border p-2 transition hover:border-purple-500 hover:text-purple-600"><FaPinterestP /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-center sm:px-6 md:flex-row md:text-left">
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium md:justify-start">
            <span className="cursor-pointer hover:text-purple-100">Terms & Conditions</span>
            <span className="cursor-pointer hover:text-purple-100">Shipping Policy</span>
            <span className="cursor-pointer hover:text-purple-100">Cancellation Policy</span>
            <span className="cursor-pointer hover:text-purple-100">Privacy Policy</span>
          </div>

          <p className="text-sm">
            © 2026 PURPLLE E-RETAIL LIMITED All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
