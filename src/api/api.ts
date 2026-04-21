import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { refresh } from "./auth";

const api = axios.create({
  baseURL: "https://localhost:5173/",
  withCredentials: true,
});

// 요청 인터셉터: 모든 요청에 토큰을 자동으로 심어줌
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러(토큰 만료)가 발생했을 때
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refresh();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // 원래 하려던 요청 재시도
      } catch (err) {
        // 리프레시도 실패하면 로그아웃 처리
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
