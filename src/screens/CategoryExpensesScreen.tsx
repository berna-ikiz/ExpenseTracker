import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CategoryItemType, ExpenseItemType } from "../types";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";
import ExpenseCardList from "../components/ExpenseCardList";
import { HomeIcon } from "../utils/Icons";

type Params = StaticScreenProps<{
  category: CategoryItemType;
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

const CategoryExpensesScreen = ({ route }: Params) => {
  const [category] = useState(route.params.category);
  const [expenses] = useState(route.params.data.expenses);
  const [categories] = useState(route.params.data.categories);
  const [expensesByCategory] = useState(
    expenses.filter((expense) => {
      return expense.category === `${category.icon}${category.title}`;
    })
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CategoryList", {
              data: {
                expenses: expenses,
                categories: categories,
              },
            })
          }
          style={{ paddingLeft: 15 }}
        >
          <Text
            style={{
              fontSize: 22,
              color: colors.silver,
              fontWeight: "bold",
            }}
          >
            {"Back"}
          </Text>
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
    });
  }, [categories]);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ExpenseCardList
        list={expensesByCategory}
        emptyDataText={"No expenses found on this category!"}
      ></ExpenseCardList>
      <TouchableOpacity
        style={styles.addEmojiButtom}
        onPress={() =>
          navigation.navigate("Home", {
            data: {
              categories: categories,
              expenses: expenses,
            },
          })
        }
      >
        <Text style={styles.addEmojiButtomText}>
          <HomeIcon color={colors.ghostWhite} size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addEmojiButtom: {
    position: "absolute",
    right: "10%",
    bottom: "5%",
    backgroundColor: colors.gray,
    width: "20%",
    height: "8%",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addEmojiButtomText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: "5%",
  },
});
