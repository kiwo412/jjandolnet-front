import type { EditFormData } from "@/types/myPage";
import api from "./api";

export const getMyPage = async () => {
  const response = await api.get("/api/v1/user/myPage");
  return response.data.data;
};

export const editMyPage = async (formData: EditFormData) => {
  const response = await api.put("/api/v1/user/myPage", formData);
  return response.data;
};
