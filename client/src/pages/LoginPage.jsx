// LoginPage.jsx - Google OAuth only
import { useContext } from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../components/Authentication/AuthContext";
import GoogleSignIn from "../components/Authentication/GoogleSignIn.jsx";

const LoginPage = () => {
  const { setDatas } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthSuccess = (authData) => {
    localStorage.setItem("auth", JSON.stringify(authData));
    setDatas(authData);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <img src={logo} className="w-52 mb-6" alt="logo" />
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h2 className="text-gray-500 font-bold mb-4">Login / Signup</h2>
        <GoogleSignIn onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;