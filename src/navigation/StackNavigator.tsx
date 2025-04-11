import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import ExpenseDetailsScreen from "../screens/ExpenseDetailsScreen";
import CategoryAddScreen from "../screens/CategoryAddScreen";

import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import colors from "../theme/colors";

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: colors.whiteSmoke,
    },
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.slateGray,
    },
    headerTintColor: colors.slateGray,
    headerBackVisible: false,
  },
  screens: {
    Home: HomeScreen,
    Category: CategoryScreen,
    Expense: ExpenseScreen,
    ExpenseDetails: ExpenseDetailsScreen,
    CategoryAdd: CategoryAddScreen,
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
