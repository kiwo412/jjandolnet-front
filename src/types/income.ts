export type Income = {
  id: number;
  amount: string | number;
  incomeDate: string;
};

export type IncomeFormProps = {
  initialData?: Income;
  isPending?: boolean;
  onSubmit: (data: Income) => void;
};

export type incomeCreateOrEditRequest = Pick<Income, "amount" | "incomeDate">;
