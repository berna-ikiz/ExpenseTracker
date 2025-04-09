import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import StackNavigator from "../ExpenseTracker/src/navigation/StackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.bottomSheetContainer}>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: "grey",
  },
});

export default App;
