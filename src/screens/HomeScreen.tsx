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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  calculateTotalExpense,
  sortExpenses,
} from "../features/expense/expenseSlice";
import { categories } from "rn-emoji-picker/dist/constants";

type Props = StaticScreenProps<{
  expense?: ExpenseItemType;
}>;

//TODO : Add types for navigation and route
const Home = ({ route }: Props) => {
  const expenses = useSelector((state: RootState) => state.expense.expenses);
  const dispatch = useDispatch();

  const [totalExpense, setTotalExpense] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(calculateTotalExpense());
  }, [expenses]);

  /*
  useEffect(() => {
    
    const sortedExpenses = [...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setExpenses((prev) => {
      const prevIds = prev.map((e) => e.id).join(",");
      const newIds = sortedExpenses.map((e) => e.id).join(",");
      return prevIds !== newIds ? sortedExpenses : prev;
    });


  }, [expenses]);
  */

  /*
  useEffect(() => {
    if (route.params?.data) {
      setExpenses(route.params.data.expenses || []);
      setCategories(route.params.data.categories || []);
    }
  }, [route.params?.data]);
  */

  /*
  useEffect(() => {
    if (route.params?.expense) {
      setExpenses((prev) => {
        return route.params.expense ? [...prev, route.params.expense] : prev;
      });
    }
  }, [route.params && route.params.expense]);
*/

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
