import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";
import { logout, refresh } from "../api/auth";

export const useAuthStore = create(
  devtools(
    combine(
      {
        accessToken: null as string | null,
        isLogInState: false,
      },
      (set) => ({
        setToken: (token: string) =>
          set(
            { accessToken: token, isLogInState: true },
            false,
            "auth/setToken",
          ),
        logout: () =>
          set({ accessToken: null, isLogInState: false }, false, "auth/logout"),
      }),
    ),
    { name: "AuthStore" },
  ),
);

//훅 - 셀렉터 - 리렌더링
export const useToken = (token: string) => {
  const setAccessToken = useAuthStore((state) => state.setToken(token));
  return setAccessToken;
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  return logout;
};

//정적방식 - 값을 가져가고, 변하게도 하지만, 리렌더링 안일어남
export const getAccessToken = () => useAuthStore.getState().accessToken;

export const getIsLogInState = () => useAuthStore.getState().isLogInState;

//새로고침 액세스 토큰 처리
//추후에 localstorage 쓸지 좀더 생각하기
export const authRefreshActions = {
  // ... 기존 setToken, logout

  // 새로고침 시 호출할 초기화 함수
  rehydrate: async () => {
    try {
      // 1. 서버의 refresh 엔드포인트 호출 (쿠키는 브라우저가 자동으로 보냄)
      const res = await refresh();
      const { accessToken } = res.data.data;

      // 2. 성공하면 스토어에 토큰 채우기
      useAuthStore.getState().setToken(accessToken);
    } catch (error) {
      // 3. 실패하면 (로그인 만료 등) 깨끗이 비우기
      useAuthStore.getState().logout();
    }
  },
};

//로그아웃 리프레시 토큰 0으로 갱신.
export const authlogoutActions = {
  logout: async () => {
    try {
      await logout();
    } catch (error) {
      console.log("로그아웃 요청 실패");
      console.log(error);
    } finally {
      useAuthStore.getState().logout();
      window.location.href = "/";
    }
  },
};
