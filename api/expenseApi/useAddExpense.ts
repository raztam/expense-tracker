import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { push, ref } from "firebase/database";
import { database, expensesUrl } from "../firebase"; // Assuming you have a database export in your firebase config
import { ExpenseData } from "../../data/expenseType";
import { AuthContext } from "../../context/authContext";

const useAddExpense = () => {
  const { userId } = useContext(AuthContext);
  const addExpense = async (data: ExpenseData): Promise<void> => {
    if (!userId) {
      throw new Error("User is not authenticated");
    }
    const userExpensesRef = ref(database, expensesUrl + "/" + userId);
    console.log(userExpensesRef);
    await push(userExpensesRef, data);
  };

  return useMutation({ mutationFn: addExpense });
};

export default useAddExpense;
