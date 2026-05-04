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
