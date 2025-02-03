import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../state/authSlice";

export const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated;
};
