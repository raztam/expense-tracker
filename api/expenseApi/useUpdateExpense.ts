import { useMutation } from "@tanstack/react-query";
import { update, ref } from "firebase/database";
import { buildUserExpenseItemReference } from "../firebase";
import { ExpenseData } from "../../data/expenseType";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const useUpdateExpense = () => {
  const { userId } = useContext(AuthContext);
  const updateExpense = async (
    id: string,
    data: ExpenseData
  ): Promise<void> => {
    const userExpenseRef = buildUserExpenseItemReference(userId, id);

    await update(userExpenseRef, data);
  };

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExpenseData }) =>
      updateExpense(id, data),
  });
};

export default useUpdateExpense;
