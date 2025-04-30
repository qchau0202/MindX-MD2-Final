// src/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute: loading =", loading, "user =", user); // Debug

  // Wait for loading to complete
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // Redirect to login if no user
  if (!user) {
    console.log("Redirecting to /login because user is null");
    return <Navigate to="/login" replace />;
  }

  // Redirect to homepage if role is not authorized
  if (roles && !roles.includes(user.role)) {
    console.log(`Redirecting to / because role ${user.role} not in ${roles}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
