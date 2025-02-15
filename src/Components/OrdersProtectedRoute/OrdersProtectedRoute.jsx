import { Navigate, useLocation } from "react-router-dom";

export default function OrdersProtectedRoute({ children }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentIntent = params.get("payment_intent");
  const redirectStatus = params.get("redirect_status");

  if (!paymentIntent || redirectStatus !== "succeeded") {
    return <Navigate to="/" />;
  }

  return children;
}
