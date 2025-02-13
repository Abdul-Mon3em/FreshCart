import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLogin } = useContext(UserContext);
  if (isLogin) {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
