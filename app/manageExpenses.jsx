import { View, StyleSheet } from "react-native";
import React, { useLayoutEffect, useContext } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import useDeleteExpense from "../api/useDeleteExpense";
import Loading from "../components/Loading";

const manageExpenses = () => {
  const navigation = useNavigation();
  const { expenseId, description, amount, date } = useLocalSearchParams();
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation]);

  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense();

  const closeModal = () => {
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteExpense(expenseId);
    closeModal();
  };

  if (isDeleting) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        expenseId={expenseId}
        description={description}
        amount={amount}
        date={date}
        closeModal={closeModal}
      />
      <View style={styles.deleteContainer}></View>
      {isEditing && (
        <IconButton
          name="trash-outline"
          color={GlobalStyles.colors.error500}
          size={36}
          onPress={handleDelete}
        />
      )}
    </View>
  );
};

export default manageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    justifyContent: "center",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
