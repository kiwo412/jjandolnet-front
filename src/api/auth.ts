import type { User, LoginRequest } from "../types/auth";

export async function signUp(user: User) {
  console.log(user);
  //const response = await axios.post('http://localhost:8080/api/v1/user/signup', user);
  //const { data, error } = await supabase.auth.supabaseApiEx
  const response = await fetch("http://localhost:8080/api/v1/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return await response.json();
}

export async function signInWithPassword(loginRequest: LoginRequest) {
  const response = await fetch("http://localhost:8080/api/v1/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
    //throw new Error(`${response.status}`);
  }

  const data = await response.json();
  return { data };
}

export async function refresh() {
  const response = await fetch("http://localhost:8080/api/v1/auth/refresh", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("리프레시 토큰이 만료되었거나 유효하지 않습니다.");
  }

  const data = await response.json();
  return { data };
}

export async function logout() {
  const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("로그아웃 요청이 실패했습니다.");
  }

  const data = await response.json();
  return { data };
}
