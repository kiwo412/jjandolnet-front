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

export const deleteExpense = async (id: number) => {
  const response = await api.delete(`/api/v1/expense/${id}`);
  return response.data;
};

export const getExpenseList = async (yearMonthDate: string) => {
  const response = await api.get(`/api/v1/expense/getExpenseList`, {
    params: {
      expenseDate: yearMonthDate,
    },
  });
  return response.data.data;
};

export const getMyScore = async (yearMonthDate: string) => {
  const response = await api.get(`/api/v1/expense/getMyScore`, {
    params: {
      scoreDate: yearMonthDate,
    },
  });
  return response.data.data;
};

export const getMyCategory = async (yearMonthDate: string) => {
  const response = await api.get(`/api/v1/expense/getMyCategory`, {
    params: {
      categoryDate: yearMonthDate,
    },
  });
  console.log("response : ", response);
  return response.data.data;
};
