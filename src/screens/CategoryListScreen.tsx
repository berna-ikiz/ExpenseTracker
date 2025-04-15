import {
  FlatList,
  LayoutAnimation,
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
import Header from "../components/Header";
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

  const handleBack = () => {
    navigation.navigate("Home", {
      data: {
        expenses: expenses,
        categories: categories,
      },
    });
  };

  const calculateTotalByCategory = (category: CategoryItemType) => {
    const total = expenses
      .filter((e) => e.category === `${category.icon}${category.title}`)
      .reduce((sum, e) => sum + Number(e.coast), 0);
    return total.toFixed(2);
  };

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
        <View style={styles.iconWrapper}>
          <Text style={styles.listIcon}>{item.icon}</Text>
        </View>
        <View style={styles.categoryTextGroup}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.categoryAmountText}>
            ₺{calculateTotalByCategory(item)} spent
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Categories" />

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
        style={styles.addButton}
      >
        <AddIcon color={colors.ghostWhite} size={20} />
      </TouchableOpacity>

      <BackButton onPress={handleBack} />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "4%",
  },
  ListCard: {
    backgroundColor: colors.slateGray50,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: colors.slateGray600,
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
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.slateGray50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  listIcon: {
    fontSize: 20,
    color: colors.slateGray200,
  },
  categoryTextGroup: {
    flex: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#2E3A59",
  },
  categoryAmountText: {
    fontSize: 14,
    color: "#6E7B8B",
    marginTop: 4,
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.slateGray,
    shadowColor: "#2F4F4F",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 28,
    width: 56,
    height: 56,
    elevation: 5,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.slateGray,
    marginTop: 8,
  },
  emptyStateHint: {
    fontSize: 14,
    color: "#7A8B99",
    marginTop: 4,
  },
});
