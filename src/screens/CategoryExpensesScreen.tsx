import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { CategoryItemType, ExpenseItemType } from "../types";
import {
  StackActions,
  StaticScreenProps,
  useNavigation,
} from "@react-navigation/native";
import colors from "../theme/colors";
import ExpenseCardList from "../components/ExpenseCardList";
import { HomeIcon } from "../utils/Icons";
import Header from "../components/Header";
import BackButton from "../components/BackButton";

type Params = StaticScreenProps<{
  category: CategoryItemType;
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

const CategoryExpensesScreen = ({ route }: Params) => {
  const navigation = useNavigation();
  const [category] = useState(route.params.category);
  const { expenses, categories } = route.params.data;

  const [expensesByCategory] = useState(
    expenses.filter((expense) => {
      return expense.category === `${category.icon}${category.title}`;
    })
  );

  const handleBack = () => {
    navigation.dispatch(
      StackActions.popTo("CategoryList", {
        data: {
          expenses: expenses,
          categories: categories,
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Expenses" />
      <ExpenseCardList
        list={expensesByCategory}
        emptyDataText={"No expenses found on this category!"}
      ></ExpenseCardList>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.dispatch(
            StackActions.popTo("Home", {
              data: {
                expenses: expenses,
                categories: categories,
              },
            })
          )
        }
      >
        <HomeIcon color={colors.ghostWhite} size={24} />
      </TouchableOpacity>
      <BackButton onPress={handleBack} />
    </View>
  );
};

export default CategoryExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.slateGray500,
    borderRadius: 28,
    width: 56,
    height: 56,
    elevation: 5,
  },
});
