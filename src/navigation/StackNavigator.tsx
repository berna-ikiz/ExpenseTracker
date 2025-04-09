import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import ExpenseDetailsScreen from "../screens/ExpenseDetailsScreen";
import CategoryAddScreen from "../screens/CategoryAddScreen";

import { createStaticNavigation } from "@react-navigation/native";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Category: CategoryScreen,
    Expense: ExpenseScreen,
    ExpenseDetails: ExpenseDetailsScreen,
    CategoryAdd: CategoryAddScreen,
  },
});

const StackNavigator = createStaticNavigation(RootStack);

export default StackNavigator;
