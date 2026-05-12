import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";
import { refresh } from "./auth";
import type { Token } from "@/types/auth";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: "http://localhost:8080/",
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
  //액세스 토큰 만료시 응답
  //리프레시 토큰으로 액세스 토큰 새로 받은 후 요청 재전송
  (response) => response,
  async (error) => {
    const {
      config,
      response: { data },
    } = error;

    const originalRequest = config as CustomAxiosRequestConfig;

    if (data.code === "T002") {
      try {
        if (originalRequest._retry) {
          useAuthStore.getState().logout();
          return Promise.reject(new Error("재시도 한계 초과"));
        }

        originalRequest._retry = true;

        const refreshResponse = await refresh();
        const tokenData: Token = refreshResponse.data.data;

        if (tokenData && tokenData.accessToken) {
          useAuthStore.getState().setToken(tokenData);

          originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;

          return api(originalRequest);
        }
      } catch (err) {
        // 리프레시도 실패하면 로그아웃 처리
        useAuthStore.getState().logout();

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
