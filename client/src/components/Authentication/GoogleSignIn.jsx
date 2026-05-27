// src/components/Authentication/GoogleSignIn.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Authentication/AuthContext";
import api from "../../api/axiosInstance";

// Ensure Google Identity Services is initialized only once per page load
let gsiInitialized = false;

export default function GoogleSignIn() {
  const navigate = useNavigate();
  const { setDatas } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error("Google Client ID not set in environment");
      setError("Google configuration missing");
      return;
    }

    // Load Google Identity Services script (once) and initialize when ready
    const scriptId = "google-identity-services";
    const loadGsiScript = () => {
      return new Promise((resolve) => {
        const existing = document.getElementById(scriptId);
        if (existing) return resolve();
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    const initializeGsi = () => {
      if (gsiInitialized) return;
      if (!window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        { theme: "outline", size: "large", type: "standard" }
      );
      gsiInitialized = true;
    };

    loadGsiScript().then(initializeGsi);
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const { credential } = response; // JWT id_token
      const { data } = await api.post("/auth/google", { token: credential });
      const authData = { status: true, token: data.token, user: data.user };
      localStorage.setItem("auth", JSON.stringify(authData));
      setDatas(authData);
      navigate("/");
    } catch (err) {
      console.error("Google auth failed", err);
      setError("Google sign‑in failed. Please try again.");
    }
  };

    return (
      <div className="flex flex-col items-center gap-4">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {/* Premium glass‑morphic wrapper */}
        <div id="googleSignInBtn" className="google-signin-wrapper" />
      </div>
    );
}
