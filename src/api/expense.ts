import type { ExpenseCreateRequest, ExpenseEditRequest } from "@/types/expense";
import api from "./api";

export const getExpenseCategory = async () => {
  const response = await api.get(`/api/v1/expense/expenseCategoryList`);
  return response.data.data;
};

export const createExpense = async (expense: ExpenseCreateRequest) => {
  const response = await api.post("/api/v1/expense", expense);
  return response.data;
};

export const editExpense = async (expense: ExpenseEditRequest) => {
  const response = await api.put("/api/v1/expense", expense);
  return response.data;
};

export const getExpenseList = async () => {
  const response = await api.get(`/api/v1/expense/getExpenseList`);
  return response.data.data;
};
