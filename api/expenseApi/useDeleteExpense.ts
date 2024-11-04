import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remove, ref } from "firebase/database";
import { buildUserExpenseItemReference } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const useDeleteExpense = () => {
  const { userId } = useContext(AuthContext);
  const deleteExpense = async (id: string): Promise<void> => {
    const userExpenseRef = buildUserExpenseItemReference(userId, id);
    await remove(userExpenseRef);
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export default useDeleteExpense;
