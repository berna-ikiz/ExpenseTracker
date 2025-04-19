import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import StackNavigator from "./src/navigation/StackNavigator";
import { store } from "./src/store/store";
import { Provider } from "react-redux";

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
      </SafeAreaView>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
