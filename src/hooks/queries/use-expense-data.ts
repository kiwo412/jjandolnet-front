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

export const useExpenseList = () => {
  return useQuery<Expense[]>({
    queryKey: QUERY_KEYS.expense.list(),
    queryFn: () => getExpenseList(),
    staleTime: 0,
  });
};
