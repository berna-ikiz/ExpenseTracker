import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  StackActions,
  StaticScreenProps,
  useNavigation,
} from "@react-navigation/native";
import colors from "../theme/colors";
import Calendar from "../components/Calendar";
import CategorySelector from "../components/CategorySelector";
import categoryData from "../data/CategoryData";
import BottomSheet from "@gorhom/bottom-sheet";
import { Category, CategoryItemType, ExpenseItemType } from "../types";
import { AddIcon } from "../utils/Icons";

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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Home", {
              data: {
                expenses: route.params?.data?.expenses,
                categories: route.params?.data?.categories,
              },
            })
          }
          style={{ paddingLeft: 15 }}
        >
          <Text
            style={{
              fontSize: 22,
              color: colors.silver,
              fontWeight: "bold",
            }}
          >
            {"Back"}
          </Text>
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
    });
  }, [route.params?.data]);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
    setCalenderVisible(false);
  };

  const handleCoastChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setCoast(numericText);
  };

  const handleAddExpense = () => {
    if (!title || !coast || !selectedDate || !selectedCategory) {
      Alert.alert("Please fill all fields");
      return;
    }

    const expense = {
      id: Date.now().toString(),
      title,
      coast,
      date: selectedDate,
      category: `${selectedCategory.icon}${selectedCategory.title}`,
    };
    navigation.dispatch(
      StackActions.popTo("Home", { expense, data: route.params.data })
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
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
      <TouchableOpacity
        onPress={handleAddExpense}
        style={styles.addCategoryButton}
      >
        <Text style={styles.addCategoryButtomText}>
          <AddIcon color={colors.ghostWhite} size={20} />
        </Text>
      </TouchableOpacity>
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
    width: "100%",
  },
  addCategoryButton: {
    position: "absolute",
    right: "10%",
    bottom: "5%",
    backgroundColor: colors.gray,
    width: "20%",
    height: "8%",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addCategoryButtomText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: "5%",
  },
});
