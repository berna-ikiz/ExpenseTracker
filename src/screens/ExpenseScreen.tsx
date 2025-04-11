import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";
import Calendar from "../components/Calendar";
import CategorySelector from "../components/CategorySelector";
import categoryData from "../data/CategoryData";
import BottomSheet from "@gorhom/bottom-sheet";

type Category = {
  id: string;
  title: string;
  icon: string;
};

const Expense = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [coast, setCoast] = useState("");
  const [selectedDate, onSelectDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isCalenderVisible, setCalenderVisible] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null!);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
    setCalenderVisible(false);
  };

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
      <Calendar
        onSelectDate={onSelectDate}
        selectedDate={selectedDate}
        title={"Date"}
        isVisible={isCalenderVisible}
        onToggle={() => {
          setCalenderVisible((prev) => !prev);
          bottomSheetRef.current?.close();
        }}
      />
      <CategorySelector
        selectedCategory={selectedCategory}
        snapPoints={["60%", "90%"]}
        onSelect={(emoji: string) => {
          const category =
            categoryData.find((cat) => cat.icon === emoji) || null;
          setSelectedCategory(category);
        }}
        categoriesData={categoryData}
        onPress={openSheet}
        bottomSheetRef={bottomSheetRef}
      />
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
    shadowColor: colors.slateGray,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
