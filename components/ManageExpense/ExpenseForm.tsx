import { View, Text, StyleSheet } from "react-native";
import { FC } from "react";
import useAddExpense from "../../api/useAddExpense";
import useUpdateExpense from "../../api/useUpdateExpense";
import useForm from "../../hooks/useFrom";
import expenseSchema from "./expensesSchema";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

interface ExpenseFormProps {
  isEditing: boolean;
  expenseId?: string;
  description?: string;
  amount?: string;
  date?: string;
  closeModal: () => void;
}

const ExpenseForm: FC<ExpenseFormProps> = (props) => {
  const {
    isEditing,
    expenseId,
    description = "",
    amount = "",
    date = getFormattedDate(new Date()),
    closeModal,
  } = props;

  type InputFields = {
    amount: string;
    date: string;
    description: string;
  };

  //initial values for the form
  const initialValues: InputFields = {
    amount: amount,
    date: date,
    description: description,
  };

  const { mutate: addExpense, isPending: isAdding } = useAddExpense();
  const { mutate: updateExpense, isPending: isUpdating } = useUpdateExpense();

  const { inputValues, inputChangeHandler, errors, validateForm } = useForm(
    initialValues,
    expenseSchema
  );

  const handleCancel = () => {
    closeModal();
  };

  const handleSave = () => {
    const result = validateForm();
    console.log("result", result);
    // if there are errors, return
    if (!result) {
      console.log("errors from if", errors);
      return;
    }
    const { description, amount, date } = inputValues;
    if (expenseId) {
      updateExpense({
        id: expenseId,
        data: {
          description,
          amount: parseFloat(amount),
          date,
        },
      });
      closeModal();
      return;
    }
    addExpense({
      description,
      amount: parseFloat(amount),
      date,
    });
    closeModal();
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
            autoFocus: true,
          }}
          errors={errors?.amount}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
          errors={errors?.date}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description,
          multiline: true,
        }}
        errors={errors?.description}
      />
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={handleCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSave}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 12,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
