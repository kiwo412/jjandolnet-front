import type { FindIdRequest } from "@/types/auth";
import api from "./api";

//axios 방식
export const fetchAddress = async () => {
  const response = await api.get(`/api/v1/user/addressList`);
  return response.data.data;
};

export const fetchJob = async () => {
  const response = await api.get(`/api/v1/user/jobList`);
  return response.data.data;
};

export const findId = async (data: FindIdRequest) => {
  const response = await api.post("/api/v1/user/findEmail", data);
  return response.data.data;
};

export const sendTempPw = async (email: string) => {
  const param = { email: email };
  const response = await api.post("/api/v1/mail/sendTempPw", param);
  return response.data.data;
};
