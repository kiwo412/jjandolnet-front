import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../lib/constants";
import type {
  Expense,
  ExpenseCategory,
  MainChartResponse,
  MainChartSearchCondition,
  MyCategoryResponse,
  MyScore,
} from "@/types/expense";
import {
  getExpenseCategory,
  getExpenseList,
  getMainChartData,
  getMyCategory,
  getMyScore,
} from "@/api/expense";
import type { AxiosError } from "axios";
import type { CustomAxiosErrorResponse } from "@/utils/error";

export const useExpenseCategoryData = () => {
  return useQuery<ExpenseCategory[]>({
    queryKey: QUERY_KEYS.expenseCategory.list(),
    queryFn: () => getExpenseCategory(),
    staleTime: Infinity,
  });
};

export const useExpenseList = (yearMonthDate: string) => {
  return useQuery<Expense[]>({
    queryKey: QUERY_KEYS.expense.list(yearMonthDate),
    queryFn: () => getExpenseList(yearMonthDate),
    staleTime: 0,
  });
};

export const useMyScoreData = (yearMonthDate: string) => {
  return useQuery<MyScore, AxiosError<CustomAxiosErrorResponse>>({
    queryKey: QUERY_KEYS.expense.myScore(yearMonthDate),
    queryFn: () => getMyScore(yearMonthDate),
    staleTime: 0,
  });
};

export const useMyCategoryData = (yearMonthDate: string) => {
  return useQuery<MyCategoryResponse, AxiosError<CustomAxiosErrorResponse>>({
    queryKey: QUERY_KEYS.expense.myCategory(yearMonthDate),
    queryFn: () => getMyCategory(yearMonthDate),
    staleTime: 0,
  });
};

export const useMainChartData = (condition: MainChartSearchCondition) => {
  return useQuery<MainChartResponse, AxiosError<CustomAxiosErrorResponse>>({
    queryKey: QUERY_KEYS.expense.mainChart(condition),
    queryFn: () => getMainChartData(condition),
    staleTime: 0,
  });
};
