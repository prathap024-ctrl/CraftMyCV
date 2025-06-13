import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
