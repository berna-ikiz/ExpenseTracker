import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryListScreen from "../screens/CategoryListScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import ExpenseDetailsScreen from "../screens/ExpenseDetailsScreen";
import CategoryAddScreen from "../screens/CategoryAddScreen";

import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import CategoryExpensesScreen from "../screens/CategoryExpensesScreen";

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    headerBackVisible: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "Home",
      },
    },
    CategoryList: {
      screen: CategoryListScreen,
      options: {
        title: "Categories",
      },
    },

    Expense: {
      screen: ExpenseScreen,
      options: {
        title: "Add Expense",
      },
    },
    ExpenseDetails: {
      screen: ExpenseDetailsScreen,
      options: {
        title: "Expense Details",
      },
    },
    CategoryAdd: {
      screen: CategoryAddScreen,
      options: {
        title: "Add Category",
      },
    },
    CategoryExpensesScreen: {
      screen: CategoryExpensesScreen,
      options: {
        title: "Category Details",
      },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const StackNavigator = createStaticNavigation(RootStack);

export default StackNavigator;
