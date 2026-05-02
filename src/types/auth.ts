export type User = {
  email: string;
  password: string;
  nickname: string;
  birthDate: string;
  gender: string;
  addressId: number;
  jobId: number;
};

export type LoginRequest = Pick<User, "email" | "password">;

export type Token = {
  accessToken: string;
  grantType: string;
  uuid: string;
  nickname: string;
};
