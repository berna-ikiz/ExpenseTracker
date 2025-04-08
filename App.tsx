import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import StackNavigator from "../ExpenseTracker/src/navigation/StackNavigator";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StackNavigator />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
