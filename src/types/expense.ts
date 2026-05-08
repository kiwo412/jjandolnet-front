import type { CustomAxiosErrorResponse } from "@/utils/error";
import type { AxiosError } from "axios";

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

export type ExpenseDialogProps = {
  categories: ExpenseCategory[];
  onSave: (data: ExpenseCreateRequest) => void;
  onDelete: () => void;
  isOpen: boolean;
  onClose: () => void;
  initialData: Expense | null;
  currentDate: Date;
};

export type MyScore = {
  score: number;
  totalExpense: number;
  feedback: string;
  status: boolean;
};

export type MyCategory = {
  name: string;
  expense: number;
  percent: number;
};

export type MyCategoryResponse = {
  categories: MyCategory[];
  status: boolean;
};

export type MainChartValue = {
  category: string;
  average: number;
};

export type MainChartResponse = {
  mainChartValues: MainChartValue[];
};

export type ExpenseGraphScoreProps = {
  myScoreData: MyScore | undefined;
  isMyScorePending: boolean;
  isCreatePending: boolean;
  isEditPending: boolean;
  myScoreError: AxiosError<CustomAxiosErrorResponse> | null;
};

export type ExpenseGraphCategoryProps = {
  myCategoryData: MyCategoryResponse | undefined;
  isMyCategoryPending: boolean;
  isCreatePending: boolean;
  isEditPending: boolean;
  myCategoryError: AxiosError<CustomAxiosErrorResponse> | null;
};

export type MainChartSearchCondition = {
  filter: "age" | "job" | "addr";
  selectedCategory: number;
};
