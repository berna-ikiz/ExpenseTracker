import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import colors from "../theme/colors";
import EmojiPickerSheet from "../components/EmojiPickerSheet";
import {
  StackActions,
  StaticScreenProps,
  useNavigation,
} from "@react-navigation/native";
import { CategoryItemType, ExpenseItemType } from "../types";
import BackButton from "../components/BackButton";
import { AddIcon, EmojiIcon } from "../utils/Icons";
import EmojiInput from "../components/EmojiInput";

type Props = StaticScreenProps<{
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

const CategoryAddScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const [categoryData, setCategoryData] = useState({
    name: "",
    emoji: "",
  });
  const [showEmojiSheet, setShowEmojiSheet] = useState(false);
  const { expenses, categories } = route.params.data;

  const handleSaveCategory = () => {
    if (!categoryData.emoji) {
      Alert.alert("Please Add Emoji");
      return;
    }

    if (!categoryData.name.trim()) {
      Alert.alert("Please add category name.");
      return;
    }

    const isDuplicate = categories.some(
      (cat) =>
        cat.title.toLowerCase() === categoryData.name.trim().toLowerCase()
    );

    if (isDuplicate) {
      Alert.alert("This category already exists.");
      return;
    }

    const category = {
      id: Date.now().toString(),
      title: categoryData.name.trim(),
      icon: categoryData.emoji,
    };

    const updatedCategories = [...categories, category];

    navigation.dispatch(
      StackActions.popTo("CategoryList", {
        category: category,
        data: { categories: updatedCategories, expenses: expenses },
      })
    );
  };

  const handleBack = () => {
    navigation.dispatch(
      StackActions.popTo("CategoryList", {
        data: {
          expenses: expenses,
          categories: categories,
        },
      })
    );
  };

  const handleEndEditing = (text: string) => {
    console.log("here");
    setCategoryData((prev) => ({ ...prev, name: text }));
  };

  const handleEmojiSelect = (emoji: string) => {
    categoryData.emoji = emoji;
    setShowEmojiSheet(false);
  };

  const handleCloseEmojiSheet = () => {
    setShowEmojiSheet(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryAddCard}>
        <Text style={styles.subHeader}>
          Track your spending easily and stay in control.
        </Text>
        <View style={styles.categoryAddLayout}>
          <EmojiInput
            emoji={categoryData.emoji}
            onEndEditing={handleEndEditing}
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveCategory}>
            <Text style={styles.buttonText}>
              <AddIcon size={24} color={colors.white} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowEmojiSheet(true)}
      >
        <EmojiIcon size={24} color={colors.ghostWhite} />
      </TouchableOpacity>
      {showEmojiSheet && (
        <EmojiPickerSheet
          visible={showEmojiSheet}
          onClose={handleCloseEmojiSheet}
          onSelect={handleEmojiSelect}
        />
      )}
      <BackButton onPress={handleBack} zIndex={-1} />
    </View>
  );
};

export default CategoryAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 100,
    zIndex: -1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.silver,
  },
  categoryAddCard: {
    marginVertical: 30,
  },
  subHeader: {
    textAlign: "center",
    fontSize: 16,
    color: colors.slateGray300,
    marginBottom: 8,
  },
  categoryAddLayout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    marginHorizontal: "1%",
    borderRadius: 10,
  },
  button: {
    flex: 1,
    backgroundColor: colors.slateGray500,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    color: colors.white,
    textAlign: "center",
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
  },
});
