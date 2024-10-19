import { View, StyleSheet, Text } from "react-native";
import React, { FC } from "react";
import { Expense } from "./ExpansesOutputTypes";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

interface ExpensesOutputProps {
  expenses: Expense[];
  expensesPeriod: string;
  fallbackText: string;
}

const ExpensesOutput: FC<ExpensesOutputProps> = (
  props: ExpensesOutputProps
) => {
  const { expenses, expensesPeriod, fallbackText } = props;

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
