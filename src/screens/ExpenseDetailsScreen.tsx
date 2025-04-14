import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { CategoryItemType, ExpenseItemType } from "../types";
import colors from "../theme/colors";
import { DeleteIcon } from "../utils/Icons";
import { formatCurrency, formDate } from "../utils/GlobalFunctions";
import Header from "../components/Header";

type Props = StaticScreenProps<{
  item: ExpenseItemType;
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

const ExpenseDetails = ({ route }: Props) => {
  const navigation = useNavigation();
  const expenseItem = route.params.item;
  const [data, setData] = useState(route.params.data);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Home", {
              data: {
                expenses: data.expenses,
                categories: data.categories,
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
  }, [data]);

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

  return (
    <View style={styles.container}>
      <Header title="Expense Summary" />
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
          <TouchableOpacity
            onPress={handleDelete}
            style={styles.addExpenseButton}
          >
            <Text style={styles.addExpenseButtonText}>
              {" "}
              <DeleteIcon color={colors.ghostWhite} size={20} />{" "}
            </Text>
          </TouchableOpacity>
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
  addExpenseButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: colors.gray,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addExpenseButtonText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: "5%",
  },
});
