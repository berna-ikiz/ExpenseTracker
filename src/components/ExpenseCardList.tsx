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
import {
  formatCurrency,
  formDate,
  formDateOnlyHours,
} from "../utils/GlobalFunctions";

type Props = {
  list: ExpenseItemType[];
  onPress?: (item: ExpenseItemType) => void;
  emptyDataText?: string;
};

const ExpenseCardList = ({ list, onPress, emptyDataText }: Props) => {
  const renderItem = ({ item }: { item: ExpenseItemType }) => (
    <View style={styles.expenseCard}>
      <TouchableOpacity
        onPress={onPress ? () => onPress(item) : undefined}
        activeOpacity={0.8}
      >
        <View style={styles.expenseCardHeader}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.coast}>{formatCurrency(item.coast, "TRY")}</Text>
        </View>
        <View style={styles.expenseDateCard}>
          <Text style={styles.date}>{formDateOnlyHours(item.date)}</Text>
          <Text style={styles.date}>{formDate(item.date)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      {list?.length === 0 && (
        <>
          <Text
            style={{ textAlign: "center", fontSize: 18, color: colors.silver }}
          >
            💸 No expenses found. Please add an expense.
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
    shadowColor: colors.slateGray,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 3,
  },
  expenseCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  category: {
    fontSize: 24,
    color: colors.silver,
  },
  coast: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
    color: colors.gray,
  },
  date: {
    fontSize: 18,
    color: colors.lightGray,
    right: 0,
    textAlign: "right",
  },
  expenseDateCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
});
