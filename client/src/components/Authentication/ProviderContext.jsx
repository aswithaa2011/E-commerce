import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const ProviderContext = ({ children }) => {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.token && parsed.status === true) {
          setDatas(parsed);
        } else {
          localStorage.removeItem("auth");
          setDatas({ status: false });
        }
      } catch {
        localStorage.removeItem("auth");
        setDatas({ status: false });
      }
    } else {
      setDatas({ status: false });
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ datas, setDatas }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ProviderContext;
