import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../theme/colors";
import { ExpenseItemType } from "../types";
import { formatCurrency, formDateOnlyHours } from "../utils/GlobalFunctions";

type Props = {
  list: ExpenseItemType[];
  onPress?: (item: ExpenseItemType) => void;
  emptyDataText?: string;
};

const ExpenseCardList = ({ list, onPress, emptyDataText }: Props) => {
  const renderItem = ({ item }: { item: ExpenseItemType }) => (
    <View style={styles.expenseCard}>
      <TouchableOpacity onPress={onPress ? () => onPress(item) : undefined}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.coast}>{formatCurrency(item.coast, "TRY")}</Text>
        <Text style={styles.date}>{formDateOnlyHours(item.date)}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      {list?.length === 0 && (
        <>
          <Text style={styles.titleText}>Expenses</Text>
          <Text
            style={{ textAlign: "center", fontSize: 18, color: colors.silver }}
          >
            No expenses found. Please add an expense.
            {emptyDataText}
          </Text>
        </>
      )}
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: "20%" }}
      />
    </>
  );
};

export default ExpenseCardList;

const styles = StyleSheet.create({
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
