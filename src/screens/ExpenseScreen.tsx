import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";
import Calendar from "../components/Calendar";
import CategorySelector from "../components/CategorySelector";
import { Category } from "../types";
import { AddIcon } from "../utils/Icons";
import { formatCurrencyInput } from "../utils/GlobalFunctions";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setExpense } from "../features/expense/expenseSlice";
const Expense = () => {
  const navigation = useNavigation();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [coast, setCoast] = useState("");
  const [selectedDate, onSelectDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isCalenderVisible, setCalenderVisible] = useState(false);
  const [isCategorySelectorVisible, setCategorySelectorVisible] =
    useState(false);

  const openModal = () => {
    setCategorySelectorVisible(true);
    setCalenderVisible(false);
  };

  const handleCoastChange = (text: string) => {
    const numeric = text.replace(/\D/g, "");
    const formatted = (parseInt(numeric) / 100).toFixed(2);
    const normalizedText = formatted.replace(",", ".");
    setCoast(normalizedText);
  };

  const handleAddExpense = () => {
    if (!title || !coast || !selectedDate || !selectedCategory) {
      Alert.alert("Please fill all fields");
      return;
    }

    const expense = {
      id: Date.now().toString(),
      title,
      coast: parseFloat(coast),
      date: selectedDate,
      category: `${selectedCategory.icon}${selectedCategory.title}`,
    };
    dispatch(setExpense(expense));
    navigation.dispatch(StackActions.popTo("Home", { addedExpense: expense }));
  };

  const handleCloseCategorySelector = () => {
    setCategorySelectorVisible(false);
  };

  const handleBack = () => {
    navigation.dispatch(StackActions.popTo("Home", {}));
  };

  return (
    <View style={styles.container}>
      <Header title="Expense" />
      {categories.length > 0 ? (
        <>
          <Text style={styles.subHeader}>
            Track your spending easily and stay in control.
          </Text>
          <TextInput
            placeholder="Title"
            placeholderTextColor={colors.slateGray200}
            onEndEditing={(e) => setTitle(e.nativeEvent.text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Coast"
            placeholderTextColor={colors.slateGray200}
            value={formatCurrencyInput(coast)}
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
              //TODO    bottomSheetRef.current?.close();
            }}
          />
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelect={(emoji: string) => {
              const category =
                categories.find((cat) => cat.icon === emoji) || null;
              setSelectedCategory(category);
            }}
            categoriesData={categories}
            onPress={openModal}
            visible={isCategorySelectorVisible}
            onClose={handleCloseCategorySelector}
          />
          <TouchableOpacity onPress={handleAddExpense} style={styles.addButton}>
            <AddIcon color={colors.ghostWhite} size={20} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={{ textAlign: "center", fontSize: 18, color: colors.silver }}
          >
            No categories found. Please add a category.
          </Text>
        </>
      )}
      <BackButton onPress={handleBack} />
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
    marginTop: 32,
  },
  subHeader: {
    textAlign: "center",
    fontSize: 16,
    color: colors.slateGray300,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.slateGray600,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 24,
    borderRadius: 10,
    backgroundColor: colors.white,
    color: colors.slateGray400,
    width: "100%",
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.slateGray500,
    borderRadius: 28,
    width: 56,
    height: 56,
    elevation: 5,
  },
});
