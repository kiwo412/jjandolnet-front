import type { User } from "../types";

export async function signUp(user: User) {
  console.log(user);
  //const response = await axios.post('http://localhost:8080/api/v1/user/signup', user);
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
