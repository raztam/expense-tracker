import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get, onValue } from "firebase/database";
import { Expense, ExpenseData } from "../data/expenseType";
import { expensesRef } from "./firebase";
import { useEffect } from "react";

const useFetchExpenses = () => {
  const queryClient = useQueryClient();

  const formatData = (data: Record<string, ExpenseData>): Expense[] => {
    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  };

  const fetchExpenses = async (): Promise<Expense[]> => {
    const snapshot = await get(expensesRef);
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
    const unsubscribe = onValue(expensesRef, (snapshot) => {
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
