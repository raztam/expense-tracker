import { useMutation } from "@tanstack/react-query";
import { update, ref, getDatabase } from "firebase/database";
import { database, expensesUrl } from "../firebase";
import { ExpenseData } from "../../data/expenseType";

const useUpdateExpense = () => {
  const updateExpense = async (
    id: string,
    data: ExpenseData
  ): Promise<void> => {
    const expenseRef = ref(database, `${expensesUrl}/${id}`);
    await update(expenseRef, data);
  };

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExpenseData }) =>
      updateExpense(id, data),
  });
};

export default useUpdateExpense;
