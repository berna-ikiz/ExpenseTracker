import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StaticScreenProps } from "@react-navigation/native";
import { formatCurrency, formDateOnlyHours } from "../utils/GlobalFunctions";
import colors from "../theme/colors";
import HomeButtonList from "../components/HomeButtonList";
import ExpenseData from "../data/ExpenseData";
import CategoryData from "../data/CategoryData";
import { CategoryItemType, ExpenseItemType } from "../types";

type Props = StaticScreenProps<{
  expense?: ExpenseItemType;
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

//TODO : Add types for navigation and route
const Home = ({ route }: Props) => {
  const [expenses, setExpenses] = useState<ExpenseItemType[]>(ExpenseData);
  const [categories, setCategories] =
    useState<CategoryItemType[]>(CategoryData);

  useEffect(() => {
    if (route.params?.data) {
      setExpenses(route.params.data.expenses || []);
      setCategories(route.params.data.categories || []);
    }
  }, [route.params?.data]);

  useEffect(() => {
    if (route.params?.expense) {
      setExpenses((prev) => {
        return route.params.expense ? [...prev, route.params.expense] : prev;
      });
    }
  }, [route.params && route.params.expense]);

  const renderItem = ({ item }: { item: ExpenseItemType }) => (
    <View style={styles.expenseCard}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.coast}>{formatCurrency(item.coast, "TRY")}</Text>
      <Text style={styles.date}>{formDateOnlyHours(item.date)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Expenses</Text>
      {expenses?.length === 0 && (
        <Text
          style={{ textAlign: "center", fontSize: 18, color: colors.silver }}
        >
          No expenses found. Please add an expense.
        </Text>
      )}
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: "20%" }}
      />
      <HomeButtonList
        snapPoints={["100%", "100%"]}
        data={{ categories: categories, expenses: expenses }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  expenseCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "black",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 3,
  },
  category: {
    fontSize: 18,
    color: colors.silver,
  },
  coast: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
    color: colors.gray,
  },
  date: {
    fontSize: 14,
    color: colors.lightGray,
  },
  titleText: {
    fontSize: 28,
    color: colors.silver,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "4%",
  },
});
