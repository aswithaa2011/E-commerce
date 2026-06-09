// LoginPage.jsx - Google OAuth and Email login
import { useContext, useState } from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../components/Authentication/AuthContext";
import GoogleSignIn from "../components/Authentication/GoogleSignIn.jsx";
import api from "../api/axiosInstance"; // Assuming an axios instance exists for API calls

const LoginPage = () => {
  const { setDatas } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const handleAuthSuccess = (authData) => {
    localStorage.setItem("auth", JSON.stringify(authData));
    setDatas(authData);
    navigate("/");
  };

  const validateEmail = (value) => {
    // Simple email regex validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);
    try {
      const { data } = await api.post("/auth/email", { email });
      // Assuming the server returns a JWT token and user info similar to Google flow
      const authData = { status: true, token: data.token, user: data.user };
      handleAuthSuccess(authData);
    } catch (err) {
      console.error("Email login failed", err);
      setEmailError("Failed to login with email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <img src={logo} className="w-52 mb-6" alt="logo" />
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h2 className="text-gray-500 font-bold mb-4">Login / Signup</h2>
        {/* Email input section */}
        <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-3 mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </form>
        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative text-sm text-gray-500 bg-white px-2 inline-block">or</div>
        </div>
        {/* Google Sign‑In */}
        <GoogleSignIn onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;