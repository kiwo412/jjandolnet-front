import { getIsLogInState } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useUnAuthorized = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getIsLogInState()) {
      alert("잘못된 접근입니다.");
      navigate("/", { replace: true });
    }
  }, [navigate]);
};
