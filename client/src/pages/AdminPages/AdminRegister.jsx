import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../api/axiosInstance";

const AdminRegister = () => {
  const [formdata, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.name.trim() || !formdata.email.trim() || !formdata.password.trim()) {
      return setError("Please fill all fields");
    }
    setLoading(true);
    try {
      await adminApi.post("/admin/register", formdata);
      alert("Registered Successfully! Please login.");
      navigate("/admin/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <img src={logo} className="w-52 mb-6" alt="logo" />

      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h2 className="text-gray-700 font-bold text-2xl mb-4">Admin Register</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
            className="border w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8E1C9D] transition"
          />
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            placeholder="Enter Admin Email"
            required
            className="border w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8E1C9D] transition"
          />
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Create a Password"
            required
            className="border w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8E1C9D] transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#8E1C9D] hover:bg-[#7a1787] text-white w-full p-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-sm text-gray-500">
            Already registered?{" "}
            <a href="/admin/login" className="text-[#8E1C9D] font-medium hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
