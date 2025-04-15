import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import colors from "../theme/colors";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { CategoryItemType, ExpenseItemType } from "../types";
import { AddIcon } from "../utils/Icons";
import { Header } from "@react-navigation/elements";
import BackButton from "../components/BackButton";

type Props = StaticScreenProps<{
  category?: CategoryItemType;
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

const CategoryList = ({ route }: Props) => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<CategoryItemType[]>(
    route.params?.data?.categories
  );
  const [expenses, setExpenses] = useState<ExpenseItemType[]>(
    route.params?.data?.expenses
  );

  useEffect(() => {
    if (route.params && route.params.category) {
      setCategories((prev) =>
        route.params.category ? [...prev, route.params.category] : prev
      );
    }
  }, [route.params && route.params.category]);

  const renderItem = ({ item }: { item: CategoryItemType }) => (
    <View style={styles.ListCard}>
      <TouchableOpacity
        style={styles.listCategoryItem}
        onPress={() =>
          navigation.navigate("CategoryExpensesScreen", {
            category: item,
            data: { categories: categories, expenses: expenses },
          })
        }
      >
        <Text style={styles.listIcon}>{item.icon}</Text>
        <Text style={styles.listTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Categories" />
      {categories?.length === 0 && (
        <>
          <Text
            style={{ textAlign: "center", fontSize: 18, color: colors.silver }}
          >
            No categories found. Please add a category.
          </Text>
        </>
      )}
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: "20%" }}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CategoryAdd", { data: route.params.data })
        }
        style={styles.addCategoryButton}
      >
        <Text style={styles.addCategoryButtomText}>
          <AddIcon color={colors.ghostWhite} size={20} />
        </Text>
      </TouchableOpacity>
      <BackButton
        data={{
          data: {
            expenses: expenses,
            categories: categories,
          },
        }}
        backTarget="Home"
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "8%",
    gap: 10,
  },
  ListCard: {
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
  listCategoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.ivory,
    borderRadius: 12,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.dimGray,
  },
  listIcon: {
    fontSize: 24,
    marginRight: "10%",
  },
  addCategoryButton: {
    position: "absolute",
    right: 24,
    bottom: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.slateGray,
    shadowColor: colors.slateGray,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 28,
    width: 56,
    height: 56,
    elevation: 5,
  },
  addCategoryButtomText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: "5%",
  },
});
