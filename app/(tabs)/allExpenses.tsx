import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { GlobalStyles } from "../../constants/styles";
import ExpensesOutput from "../../components/ExpensesOutput/ExpansesOutput";
import useFetchExpenses from "../../api/expenseApi/useFetchExpenses";
import Loading from "../../components/Loading";

const allExpenses = () => {
  const { expenses, isFetching } = useFetchExpenses();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={GlobalStyles.ScreenContainer}>
      <ExpensesOutput
        expenses={expenses || []}
        expensesPeriod="Total"
        fallbackText="No expenses registered yet."
      />
    </View>
  );
};

export default allExpenses;
