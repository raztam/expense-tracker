import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get, onValue, ref } from "firebase/database";
import { Expense, ExpenseData } from "../../data/expenseType";
import { database, expensesUrl } from "../firebase";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";

const useFetchExpenses = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthContext);
  const userExpenseRef = ref(database, expensesUrl + "/" + userId);

  const formatData = (data: Record<string, ExpenseData>): Expense[] => {
    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  };

  const fetchExpenses = async (): Promise<Expense[]> => {
    const snapshot = await get(userExpenseRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return formatData(data);
    } else {
      return [];
    }
  };

  const {
    data: expenses,
    isLoading: isFetching,
    error,
  } = useQuery<Expense[], Error>({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  useEffect(() => {
    const unsubscribe = onValue(userExpenseRef, (snapshot) => {
      if (snapshot.exists()) {
        queryClient.setQueryData<Expense[]>(
          ["expenses"],
          formatData(snapshot.val())
        );
      }
    });

    return () => unsubscribe();
  }, [queryClient]);

  return { expenses, isFetching, error };
};

export default useFetchExpenses;
