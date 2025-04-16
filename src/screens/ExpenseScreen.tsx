import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  StackActions,
  StaticScreenProps,
  useNavigation,
} from "@react-navigation/native";
import colors from "../theme/colors";
import Calendar from "../components/Calendar";
import CategorySelector from "../components/CategorySelector";
import BottomSheet from "@gorhom/bottom-sheet";
import { Category, CategoryItemType, ExpenseItemType } from "../types";
import { AddIcon } from "../utils/Icons";
import { formatCurrencyInput } from "../utils/GlobalFunctions";
import Header from "../components/Header";
import BackButton from "../components/BackButton";

type Props = StaticScreenProps<{
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

const Expense = ({ route }: Props) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [coast, setCoast] = useState("");
  const [selectedDate, onSelectDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isCalenderVisible, setCalenderVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null!);
  const { expenses, categories } = route.params.data;

  const openSheet = () => {
    bottomSheetRef.current?.expand();
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
    navigation.dispatch(
      StackActions.popTo("Home", { expense, data: route.params.data })
    );
  };

  const handleBack = () => {
    navigation.dispatch(
      StackActions.popTo("Home", {
        data: {
          expenses: expenses,
          categories: categories,
        },
      })
    );
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
              bottomSheetRef.current?.close();
            }}
          />
          <CategorySelector
            selectedCategory={selectedCategory}
            snapPoints={["60%", "90%"]}
            onSelect={(emoji: string) => {
              const category =
                categories.find((cat) => cat.icon === emoji) || null;
              setSelectedCategory(category);
            }}
            categoriesData={categories}
            onPress={openSheet}
            bottomSheetRef={bottomSheetRef}
          />
          <TouchableOpacity onPress={handleAddExpense} style={styles.addButton}>
            <AddIcon color={colors.ghostWhite} size={20} />
          </TouchableOpacity>
          <BackButton onPress={handleBack} />
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
