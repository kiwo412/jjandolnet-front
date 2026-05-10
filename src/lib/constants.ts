import type { ChartSearchCondition } from "@/types/expense";
import type { PostSearchRequest } from "@/types/post";

export const QUERY_KEYS = {
  post: {
    all: ["post"],
    list: (postSearchRequest: PostSearchRequest) => [
      "post",
      "list",
      { ...postSearchRequest },
    ],
    detail: (postId: number) => ["post", "detail", postId],
    comment: (postId: number) => ["post", "comment", postId],
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
  myPage: ["myPage"],
};
