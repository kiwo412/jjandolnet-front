import { Navigate, Outlet } from "react-router-dom";
import { getIsLogInState } from "@/store/authStore";

const ProtectedRoute = () => {
  const isLogin = getIsLogInState();

  if (!isLogin) {
    alert("잘못된 접근입니다.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
