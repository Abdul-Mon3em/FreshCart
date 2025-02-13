import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";

export default function CartProtectedRoute({ children }) {
  const { cartCount } = useContext(CartContext);

  if (cartCount === 0) {
    return <Navigate to="/products" replace />;
  }

  return children;
}
