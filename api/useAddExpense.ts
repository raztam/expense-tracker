import { useMutation } from "@tanstack/react-query";
import { push } from "firebase/database";
import { expensesRef } from "./firebase";
import { ExpenseData } from "../data/expenseType";

const useAddExpense = () => {
  const addExpense = async (data: ExpenseData): Promise<void> => {
    await push(expensesRef, data);
  };

  return useMutation({ mutationFn: addExpense });
};

export default useAddExpense;
