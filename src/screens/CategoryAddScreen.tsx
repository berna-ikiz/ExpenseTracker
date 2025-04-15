import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useDebugValue, useEffect, useState } from "react";
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

type Props = StaticScreenProps<{
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

const CategoryAddScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [showEmojiSheet, setShowEmojiSheet] = useState(false);
  const [data, setData] = useState(route.params.data);

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    setShowEmojiSheet(false);
  };

  const handleSaveCategory = () => {
    if (!selectedEmoji) {
      Alert.alert("Please Add Emoji");
      return;
    }

    if (!categoryName.trim()) {
      Alert.alert("Please add category name.");
      return;
    }

    const isDuplicate = data.categories.some(
      (cat) => cat.title.toLowerCase() === categoryName.trim().toLowerCase()
    );

    if (isDuplicate) {
      Alert.alert("This category already exists.");
      return;
    }

    const category = {
      id: Date.now().toString(),
      title: categoryName.trim(),
      icon: selectedEmoji,
    };

    const updatedCategories = [...data.categories, category];

    setData((prev) => ({
      ...prev,
      categories: updatedCategories,
    }));

    navigation.dispatch(
      StackActions.popTo("CategoryList", { category, data: data })
    );
  };

  const handleBack = () => {
    console.log(data);
    navigation.navigate("CategoryList", {
      data: {
        expenses: data.expenses,
        categories: data.categories,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {categoryName ? categoryName : "Choose a category name"}
        {selectedEmoji && selectedEmoji}
      </Text>
      <View style={styles.categoryAddLayout}>
        <TextInput
          style={styles.input}
          placeholder="Category name"
          value={categoryName}
          onChangeText={(text) => {
            setCategoryName(text);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handleSaveCategory}>
          <Text style={styles.buttonText}>Add </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowEmojiSheet(true)}
      >
        <EmojiIcon size={24} color={colors.ghostWhite} />
      </TouchableOpacity>
      <EmojiPickerSheet
        visible={showEmojiSheet}
        onClose={() => setShowEmojiSheet(false)}
        onSelect={handleEmojiSelect}
        snapPoints={["50%", "50%"]}
      />
      <BackButton onPress={handleBack} zIndex={-1} />
    </View>
  );
};

export default CategoryAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: "40%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.silver,
  },
  categoryAddLayout: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
    borderRadius: 10,
  },
  input: {
    flex: 2,
    borderColor: colors.slateGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 22,
    borderRadius: 10,
    backgroundColor: colors.ivory,
    color: colors.slateGray,
    shadowColor: colors.slateGray,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "50%",
  },
  button: {
    flex: 1,
    backgroundColor: colors.slateGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: colors.slateGray,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonText: {
    fontSize: 22,
    color: colors.white,
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.slateGray,
    shadowColor: colors.slateGray,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 28,
    width: 56,
    height: 56,
    elevation: 5,
  },
});
