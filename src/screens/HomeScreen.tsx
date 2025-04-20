import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import ExpenseCardList from "../components/ExpenseCardList";
import colors from "../theme/colors";
import { formatCurrency } from "../utils/GlobalFunctions";
import FloatingActionButton from "../components/FloatingActionButton";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  calculateTotalExpense,
  loadMockExpensesData,
  sortExpenses,
} from "../features/expense/expenseSlice";
import { loadMockCategoryData } from "../features/category/categorySlice";
import { ExpenseItemType } from "../types";

type Params = StaticScreenProps<{
  addedExpense?: ExpenseItemType | undefined;
  deletedExpense?: ExpenseItemType | undefined;
}>;

const Home = ({ route }: Params) => {
  const expenses = useSelector((state: RootState) => state.expense.expenses);
  const total = useSelector((state: RootState) => state.expense.total);
  const dispatch = useDispatch();
  const deletedExpense = route?.params?.deletedExpense;
  const addedExpense = route?.params?.addedExpense;
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(calculateTotalExpense());
    dispatch(sortExpenses());
  }, [addedExpense, deletedExpense]);

  useEffect(() => {
    dispatch(loadMockExpensesData());
    dispatch(loadMockCategoryData());
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Header title="Expenses" />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: {formatCurrency(total, "TRY")}
          </Text>
        </View>
        <ExpenseCardList
          list={expenses}
          onPress={(item) =>
            navigation.navigate("ExpenseDetails", {
              item,
            })
          }
          emptyDataText="No expenses found. Please add an expense."
        />
        <FloatingActionButton />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "4%",
  },
  totalContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.slateGray400,
    textAlign: "center",
    paddingVertical: 10,
  },
});
