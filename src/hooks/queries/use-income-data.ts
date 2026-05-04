import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../lib/constants";
import type { Income } from "@/types/income";
import { getIncome } from "@/api/income";

export const useIncomeData = (yearMonth: string) => {
  return useQuery<Income>({
    queryKey: QUERY_KEYS.income.list(yearMonth),
    queryFn: () => getIncome(yearMonth),
    staleTime: 0,
  });
};
