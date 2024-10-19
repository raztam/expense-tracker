import { useMutation } from "@tanstack/react-query";
import { remove, ref } from "firebase/database";
import { database, expensesUrl } from "./firebase";

const useDeleteExpense = () => {
  const deleteExpense = async (id: string): Promise<void> => {
    const expenseRef = ref(database, `${expensesUrl}/${id}`);
    await remove(expenseRef);
  };

  return useMutation({ mutationFn: deleteExpense });
};

export default useDeleteExpense;
