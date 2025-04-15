import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { CategoryItemType, ExpenseItemType } from "../types";
import colors from "../theme/colors";
import { DeleteIcon } from "../utils/Icons";
import { formatCurrency, formDate } from "../utils/GlobalFunctions";
import Header from "../components/Header";
import BackButton from "../components/BackButton";

type Props = StaticScreenProps<{
  item: ExpenseItemType;
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

const ExpenseDetails = ({ route }: Props) => {
  const navigation = useNavigation();
  const expenseItem = route.params.item;
  const [data, setData] = useState(route.params.data);

  const handleDelete = () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (data) {
              const updatedExpenses = data.expenses.filter(
                (item) => item.id !== expenseItem.id
              );
              navigation.navigate("Home", {
                data: {
                  categories: data.categories,
                  expenses: updatedExpenses,
                },
              });
            }
          },
        },
      ]
    );
  };
  const handleBack = () => {
    navigation.navigate("Home", {
      data: {
        expenses: data.expenses,
        categories: data.categories,
      },
    });
  };
  return (
    <View style={styles.container}>
      <Header title="Expense" />
      {expenseItem ? (
        <>
          <View style={styles.expenseCard}>
            <Text style={styles.label}> Category </Text>
            <Text style={styles.value}> {expenseItem.category}</Text>
          </View>
          <View style={styles.expenseCard}>
            <Text style={styles.label}> Coast </Text>
            <Text style={styles.value}>
              {formatCurrency(expenseItem.coast, "TRY")}
            </Text>
          </View>
          <View style={styles.expenseCard}>
            <Text style={styles.label}> Date </Text>
            <Text style={styles.value}> {formDate(expenseItem.date)}</Text>
          </View>
          <TouchableOpacity onPress={handleDelete} style={styles.addButton}>
            <DeleteIcon color={colors.ghostWhite} size={20} />{" "}
          </TouchableOpacity>
          <BackButton onPress={handleBack} />
        </>
      ) : (
        <>
          <Text>Expense not found</Text>
        </>
      )}
    </View>
  );
};

export default ExpenseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.whiteSmoke,
    marginTop: 32,
  },
  expenseCard: {
    marginBottom: 16,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 2,
    shadowColor: colors.slateGray,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: "row",
  },
  label: {
    fontSize: 24,
    color: colors.charcoal,
    flex: 1,
  },
  value: {
    flex: 1,
    fontSize: 20,
    color: colors.gray,
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
    shadowColor: colors.slateGray,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 28,
    width: 56,
    height: 56,
    elevation: 5,
  },
});
