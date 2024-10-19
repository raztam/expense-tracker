import { View, Text, FlatList } from "react-native";
import React, { FC } from "react";
import { Expense } from "./ExpansesOutputTypes";
import ExpenseItem from "../ExpenseItem";

interface ExpensesListProps {
  expenses: Expense[];
}

const ExpensesList: FC<ExpensesListProps> = (props) => {
  const { expenses } = props;

  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            id={item.id}
            description={item.description}
            date={item.date}
            amount={item.amount}
          />
        )}
      />
    </View>
  );
};

export default ExpensesList;
