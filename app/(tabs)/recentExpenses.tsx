import { View } from "react-native";
import { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { GlobalStyles } from "../../constants/styles";
import { AuthContext } from "../../context/authContext";
import ExpensesOutput from "../../components/ExpensesOutput/ExpansesOutput";
import Loading from "../../components/Loading";
import { getDateMinusDays } from "../../util/date";
import useFetchExpenses from "../../api/expenseApi/useFetchExpenses";

const recentExpenses = () => {
  const { expenses, isFetching } = useFetchExpenses();
  const { isAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  if (isFetching) {
    return <Loading />;
  }

  // filter expenses for a specific period
  const recent = expenses?.filter((expense) => {
    const today = new Date();
    const dateMinus7Days = getDateMinusDays(today, 7);

    return new Date(expense.date) >= dateMinus7Days;
  });

  return (
    <View style={GlobalStyles.ScreenContainer}>
      <View>
        <ExpensesOutput
          expenses={recent || []}
          expensesPeriod="Last 7 days"
          fallbackText="No expenses registered for the last 7 days."
        />
      </View>
    </View>
  );
};

export default recentExpenses;
