import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { adminApi } from "../../api/axiosInstance";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      return setError("Please fill all fields");
    }
    setLoading(true);
    try {
      const { data } = await adminApi.post("/admin/login", formData);
      localStorage.setItem("adminAuth", JSON.stringify({
        token: data.token,
        admin: data.admin,
      }));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <img src={logo} className="w-52 mb-6" alt="logo" />

      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h2 className="text-gray-700 font-bold text-2xl mb-2">Admin Login</h2>
        <p className="text-gray-500 text-sm mb-6">Enter your credentials</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter Admin Email"
            className="border w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8E1C9D] transition"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter Password"
            className="border w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8E1C9D] transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#8E1C9D] hover:bg-[#7a1787] text-white w-full p-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-gray-600 mt-4">
            <a href="/admin/register" className="text-[#8E1C9D] font-medium hover:underline">
              Register an Admin
            </a>
            <span className="mx-2 text-gray-300">|</span>
            <a href="/login" className="text-[#8E1C9D] font-medium hover:underline">
              Back to User Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
