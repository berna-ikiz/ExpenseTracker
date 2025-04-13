import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import HomeButtonList from "../components/HomeButtonList";
import ExpenseData from "../data/ExpenseData";
import CategoryData from "../data/CategoryData";
import { CategoryItemType, ExpenseItemType } from "../types";
import ExpenseCardList from "../components/ExpenseCardList";

type Props = StaticScreenProps<{
  expense?: ExpenseItemType;
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

//TODO : Add types for navigation and route
const Home = ({ route }: Props) => {
  const [expenses, setExpenses] = useState<ExpenseItemType[]>(ExpenseData);
  const [categories, setCategories] =
    useState<CategoryItemType[]>(CategoryData);
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
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
});
