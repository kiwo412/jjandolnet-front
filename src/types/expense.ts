export type ExpenseCategory = {
  id: number;
  name: string;
};

export type Expense = {
  id: number;
  amount: number;
  expenseDate: string;
  memo: string;
  createdAt: string;
  category: ExpenseCategory;
};

export type ExpenseCreateRequest = Pick<
  Expense,
  "amount" | "expenseDate" | "memo"
> & {
  categoryId: number;
};

export type ExpenseEditRequest = ExpenseCreateRequest & { id: number };

export type ExpenseItemProps = {
  expense: Expense;
  isFirstOfDay: boolean;
};
