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
