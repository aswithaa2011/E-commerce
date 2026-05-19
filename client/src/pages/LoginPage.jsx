import { useState, useContext } from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import AuthContext from "../components/Authentication/AuthContext";

const LoginPage = () => {
  const [email, setEmail]     = useState("");
  const [otp, setOtp]         = useState("");
  const [devOtp, setDevOtp]   = useState("");   // OTP from API response (dev only)
  const [step, setStep]       = useState(1);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const { setDatas } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError("");
    if (!email.includes("@") || !email.includes(".")) {
      return setError("Enter a valid email address");
    }
    setLoading(true);
    try {
      const { data } = await api.post("/auth/send-otp", { email });
      // Backend returns otp in dev mode — capture and auto-fill it
      if (data.otp) {
        setDevOtp(data.otp);
        setOtp(data.otp);
      }
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otp || otp.length !== 6) return setError("Enter the 6-digit OTP");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/verify-otp", { email, otp });
      const authData = { status: true, token: data.token, user: data.user };
      localStorage.setItem("auth", JSON.stringify(authData));
      setDatas(authData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <img src={logo} className="w-52 mb-6" alt="logo" />

      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h2 className="text-gray-500 font-bold mb-4">Login / Signup</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="border w-full p-2 rounded mb-4 outline-none focus:ring-2 focus:ring-[#8E1C9D]"
              placeholder="Enter Email ID"
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="bg-[#8E1C9D] hover:bg-[#7a1787] text-white w-full p-3 rounded-xl mb-4 disabled:opacity-60 transition"
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
            <div className="text-sm text-gray-600">
              <p>Buying for work?</p>
              <a href="#" className="text-[#8E1C9D] font-medium">Create a free business account</a>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-500 mb-2">
              OTP sent to <strong>{email}</strong>
            </p>

            {/* DEV MODE banner — shows OTP returned from API */}
            {devOtp && (
              <div className="flex items-center justify-between bg-amber-50 border border-amber-300 rounded-lg px-3 py-2 mb-3 text-left">
                <div>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">🛠 Dev Mode — Your OTP</p>
                  <p className="text-2xl font-black text-amber-800 tracking-widest mt-0.5">{devOtp}</p>
                </div>
                <button
                  onClick={() => setOtp(devOtp)}
                  className="text-xs bg-amber-200 hover:bg-amber-300 text-amber-800 font-semibold px-2 py-1 rounded transition"
                >
                  Fill
                </button>
              </div>
            )}

            <input
              type="text"
              value={otp}
              onChange={(e) => { setOtp(e.target.value); setError(""); }}
              className="border w-full p-2 rounded mb-4 outline-none focus:ring-2 focus:ring-[#8E1C9D] tracking-widest text-center text-lg font-bold"
              placeholder="_ _ _ _ _ _"
              maxLength={6}
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="bg-[#8E1C9D] hover:bg-[#7a1787] text-white w-full p-3 rounded-xl mb-4 disabled:opacity-60 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={() => { setStep(1); setOtp(""); setDevOtp(""); setError(""); }}
              className="text-sm text-gray-500 underline"
            >
              Change Email
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;