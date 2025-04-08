import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Expense = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Expense</Text>
      <Button
        title="category add"
        onPress={() => navigation.navigate("Category")}
      />
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({});
