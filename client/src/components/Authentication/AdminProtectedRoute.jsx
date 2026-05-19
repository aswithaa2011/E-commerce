import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "{}");
  if (!adminAuth.token) return <Navigate to="/admin/login" />;
  return children;
};

export default AdminProtectedRoute;
