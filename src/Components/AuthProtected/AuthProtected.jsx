import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { Navigate } from "react-router-dom";

export default function AuthProtected({ children }) {
  const { token } = useContext(UserContext);

  return token ? <Navigate to="/" /> : children;
}
