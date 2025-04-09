import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";
import Calender from "../components/Calender";

const Expense = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [coast, setCoast] = useState("");
  const [selectedDate, onSelectDate] = useState("");

  const handleCoastChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setCoast(numericText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      <TextInput
        placeholder="title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Coast"
        value={coast}
        onChangeText={handleCoastChange}
        style={styles.input}
        keyboardType="numeric"
      />
      <Calender onSelectDate={onSelectDate} selectedDate={selectedDate} />
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: "bold",
    color: colors.silver,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.slateGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 24,
    borderRadius: 10,
    backgroundColor: colors.ivory,
    color: colors.slateGray,
  },
});
