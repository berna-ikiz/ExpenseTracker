import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ExpenseData from "../data/ExpenseData";
import { useNavigation } from "@react-navigation/native";
import { formatCurrency, formDateOnlyHours } from "../utils/GlobalFunctions";
import colors from "../theme/colors";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FlatList
          data={ExpenseData}
          renderItem={({ item }) => (
            <View style={styles.expenseList}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.coast}>
                {formatCurrency(item.coast, "TRY")}
              </Text>
              <Text style={styles.date}>{formDateOnlyHours(item.date)}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Expense")}
        style={styles.addExpenseButtom}
      >
        <Text style={styles.addExpenseButtomText}> + </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  expenseList: {
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
  addExpenseButtom: {
    position: "absolute",
    right: "10%",
    bottom: "5%",
    backgroundColor: colors.silver,
    width: "20%",
    height: "8%",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addExpenseButtomText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: "5%",
  },
  scrollView: {
    paddingBottom: "20%",
  },
});
