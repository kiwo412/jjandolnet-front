import type { ChartSearchCondition } from "@/types/expense";

export const QUERY_KEYS = {
  post: {
    all: ["post"],
    list: (page: number) => ["post", "list", { page }],
    detail: (postId: number) => ["post", "detail", postId],
  },
  address: {
    list: () => ["address", "list"],
  },
  job: {
    list: () => ["job", "list"],
  },
  expense: {
    all: ["expense"],
    list: (yearMonthDate: string) => ["expend", "list", yearMonthDate],
    myScore: (yearMonthDate: string) => ["expend", "myScore", yearMonthDate],
    myCategory: (yearMonthDate: string) => [
      "expend",
      "myCategory",
      yearMonthDate,
    ],
    mainChart: (condition?: ChartSearchCondition) => {
      const baseKey = ["expend", "mainChart"];
      return condition ? [...baseKey, condition] : baseKey;
    },
    subChart1: (condition?: ChartSearchCondition) => {
      const baseKey = ["expend", "subChart1"];
      return condition ? [...baseKey, condition] : baseKey;
    },
  },
  expenseCategory: {
    list: () => ["expendCategory", "list"],
  },
  income: {
    all: ["income"],
    list: (month: string) => ["income", "list", month],
  },
};

export const BUCKET_NAME = "uploads";
