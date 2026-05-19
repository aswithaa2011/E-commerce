import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";

const ProtectedContext = ({ children }) => {
  const { datas } = useContext(AuthContext);
  if (!datas || datas.status !== true) return <Navigate to="/login" />;
  return children;
};

export default ProtectedContext;
