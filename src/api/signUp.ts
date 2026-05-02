import api from "./api";

//axios 방식
export const fetchAddress = async () => {
  const response = await api.get(`/api/v1/user/addressList`);
  console.log(response.data.data);
  return response.data.data;
};

export const fetchJob = async () => {
  const response = await api.get(`/api/v1/user/jobList`);
  console.log(response.data.data);
  return response.data.data;
};
