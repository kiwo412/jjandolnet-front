import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../lib/constants";
import type { Expense, ExpenseCategory } from "@/types/expense";
import { getExpenseCategory, getExpenseList } from "@/api/expense";

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
