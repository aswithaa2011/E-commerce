import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import Footer from "../components/Layouts/Footer";
import api from "../api/axiosInstance";
import AuthContext from "../components/Authentication/AuthContext";

const Contact = () => {
  const { datas } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", orderId: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    // 🔒 Auth check — show modal if not authenticated
    if (!datas || datas.status !== true) {
      return setShowModal(true);
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return setError("Name, email, and message are required.");
    }
    setLoading(true);
    try {
      await api.post("/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", orderId: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-[70vh] bg-gradient-to-b from-purple-50 via-white to-violet-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h1>
            <p className="mt-3 text-sm text-gray-600">
              We are here to help with orders, delivery, returns, and product support.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-4">
              <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="rounded-full bg-purple-100 p-3 text-lg text-purple-700"><FiPhoneCall /></span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Call Support</h3>
                    <p className="mt-1 text-sm text-gray-600">+91 98765 43210</p>
                    <p className="text-xs text-gray-500">Mon-Sat, 10:00 AM to 7:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="rounded-full bg-purple-100 p-3 text-lg text-purple-700"><FiMail /></span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                    <p className="mt-1 text-sm text-gray-600">support@glowra.com</p>
                    <p className="text-xs text-gray-500">Reply within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="rounded-full bg-purple-100 p-3 text-lg text-purple-700"><FiMapPin /></span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Office</h3>
                    <p className="mt-1 text-sm text-gray-600">2nd Floor, Beauty Hub, Bangalore, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
              <p className="mt-2 text-sm text-gray-500">Fill this form and our team will get back to you soon.</p>

              {success && (
                <div className="mt-4 rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm font-medium">
                  ✅ Message sent! We'll reply within 24 hours.
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                />
                <input
                  type="text"
                  name="orderId"
                  value={form.orderId}
                  onChange={handleChange}
                  placeholder="Order ID (Optional)"
                  className="h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message..."
                  className="sm:col-span-2 rounded-xl border border-gray-200 p-4 text-sm outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="sm:col-span-2 h-12 rounded-xl bg-gradient-to-r from-purple-700 to-violet-600 text-sm font-semibold text-white transition hover:from-purple-800 hover:to-violet-700 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* 🔒 Auth Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>

            {/* Lock Icon */}
            <div className="flex justify-center mb-4">
              <span className="text-5xl">🔒</span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-sm text-gray-500 mb-6">
              You need to be logged in to send a message. Please login or create an account.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/login")}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-700 to-violet-600 text-white font-semibold text-sm hover:from-purple-800 hover:to-violet-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full h-11 rounded-xl border-2 border-purple-600 text-purple-700 font-semibold text-sm hover:bg-purple-50 transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
