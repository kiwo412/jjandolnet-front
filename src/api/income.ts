import type { incomeCreateOrEditRequest } from "@/types/income";
import api from "./api";

export const getIncome = async (yearMonth: string) => {
  const response = await api.get(`/api/v1/expense/getIncome`, {
    params: { incomeDate: yearMonth },
  });
  return response.data.data;
};

export const cuIncome = async (income: incomeCreateOrEditRequest) => {
  const response = await api.post("/api/v1/expense/cuIncome", income);
  return response.data;
};
