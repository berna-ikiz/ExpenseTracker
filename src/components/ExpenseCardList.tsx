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
type RenderItemProps = {
  item: ExpenseItemType;
  onPress?: (item: ExpenseItemType) => void;
};

const renderItem = (props: RenderItemProps) => {
  const { item, onPress } = props;
  return (
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
};

const ExpenseCardList = ({ list, onPress, emptyDataText }: Props) => {
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
        renderItem={({ item }) => renderItem({ item, onPress })}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: "20%" }}
        extraData={list}
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
    borderColor: colors.slateGray50,
    borderWidth: 2,
    elevation: 3,
  },
  expenseCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  category: {
    fontSize: 24,
    color: colors.slateGray400,
    fontWeight: "600",
  },
  coast: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
    color: colors.slateGray300,
  },
  date: {
    fontSize: 18,
    color: colors.slateGray200,
    right: 0,
    textAlign: "right",
  },
  expenseDateCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
});
