import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";
import { logout, refresh } from "../api/auth";
import type { Token } from "../types/auth";

export const useAuthStore = create(
  devtools(
    combine(
      {
        accessToken: null as string | null,
        uuid: null as string | null,
        nickname: null as string | null,
        isLogInState: false,
      },
      (set) => ({
        setToken: (token: Token) =>
          set(
            {
              accessToken: token.accessToken,
              uuid: token.uuid,
              nickname: token.nickname,
              isLogInState: true,
            },
            false,
            "auth/setToken",
          ),
        setNickname: (nickname: string) =>
          set({ nickname }, false, "auth/setNickname"),
        logout: () =>
          set(
            {
              accessToken: null,
              uuid: null,
              nickname: null,
              isLogInState: false,
            },
            false,
            "auth/logout",
          ),
      }),
    ),
    { name: "AuthStore" },
  ),
);

//훅 - 셀렉터 - 리렌더링 - 컴포넌트 내부용
export const useToken = () => {
  const setAccessToken = useAuthStore((state) => state.setToken);
  return setAccessToken;
};

export const useSetNickname = () => {
  return useAuthStore((state) => state.setNickname);
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  return logout;
};

export const useNickname = () => useAuthStore((state) => state.nickname);

//정적방식 - 값을 가져가고, 변하게도 하지만, 리렌더링 안일어남 - 일반 JS/TS 함수나 mutation onSuccess용
export const getAccessToken = () => useAuthStore.getState().accessToken;
export const getIsLogInState = () => useAuthStore.getState().isLogInState;
export const getUuid = () => useAuthStore.getState().uuid;
export const getNickname = () => useAuthStore.getState().nickname;
export const setNickname = (nickname: string) => {
  useAuthStore.getState().setNickname(nickname);
};

//새로고침 액세스 토큰 처리
//추후에 localstorage 쓸지 좀더 생각하기
export const authRefreshActions = {
  // ... 기존 setToken, logout

  // 새로고침 시 호출할 초기화 함수
  rehydrate: async () => {
    try {
      //서버의 refresh 엔드포인트 호출 (쿠키는 브라우저가 자동으로 보냄)
      const res = await refresh();
      const token: Token = res.data.data;

      //응답이 리프레시 토큰이 없다고 오면 로그인을 안한 것이므로.
      if (res.data.status === "REFRESH_FAIL") {
        useAuthStore.getState().logout();
        return;
      }

      //성공하면 스토어에 토큰 채우기
      useAuthStore.getState().setToken(token);
    } catch (error) {
      //실패하면 (로그인 만료 등) 깨끗이 비우기
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
