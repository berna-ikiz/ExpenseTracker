import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import ExpenseData from "../data/ExpenseData";
import CategoryData from "../data/CategoryData";
import { CategoryItemType, ExpenseItemType } from "../types";
import ExpenseCardList from "../components/ExpenseCardList";
import colors from "../theme/colors";
import { formatCurrency } from "../utils/GlobalFunctions";
import FloatingActionButton from "../components/FloatingActionButton";
import Header from "../components/Header";

type Props = StaticScreenProps<{
  expense?: ExpenseItemType;
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

//TODO : Add types for navigation and route
const Home = ({ route }: Props) => {
  const [expenses, setExpenses] = useState<ExpenseItemType[]>(ExpenseData);
  const [categories, setCategories] =
    useState<CategoryItemType[]>(CategoryData);
  const [totalExpense, setTotalExpense] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const sortedExpenses = expenses.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setExpenses(sortedExpenses);

    const calculatedTotal = sortedExpenses.reduce((sum, expense) => {
      const value = parseFloat(expense.coast.toString());
      return sum + (isNaN(value) ? 0 : value);
    }, 0);

    setTotalExpense(calculatedTotal);
  }, [expenses]);

  useEffect(() => {
    if (route.params?.data) {
      setExpenses(route.params.data.expenses || []);
      setCategories(route.params.data.categories || []);
    }
    if (route.params?.expense) {
      setExpenses((prev) => {
        return route.params.expense ? [...prev, route.params.expense] : prev;
      });
    }
  }, [route.params && route.params.data, route.params && route.params.expense]);

  return (
    <>
      <View style={styles.container}>
        <Header title="Expenses" />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: {formatCurrency(totalExpense, "TRY")}
          </Text>
        </View>
        <ExpenseCardList
          list={expenses}
          onPress={(item) =>
            navigation.navigate("ExpenseDetails", {
              item,
              data: { categories: categories, expenses: expenses },
            })
          }
          emptyDataText="No expenses found. Please add an expense."
        />
        <FloatingActionButton data={{ categories, expenses }} />
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
