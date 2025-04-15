import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [showEmojiSheet, setShowEmojiSheet] = useState(false);
  const [data, setData] = useState(route.params.data);

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
    navigation.navigate("CategoryList", {
      data: {
        expenses: data.expenses,
        categories: data.categories,
      },
    });
  };

  const handleEmojiSelect = (emoji: string) => {
    console.log(emoji);
    setSelectedEmoji(emoji);
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
            emoji={selectedEmoji}
            value={categoryName}
            setChange={setCategoryName}
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
          snapPoints={["50%", "50%"]}
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
    padding: "1%",
    paddingTop: "40%",
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
    marginVertical: "15%",
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
    padding: "2%",
    marginHorizontal: "1%",
    borderRadius: 10,
    shadowColor: colors.slateGray,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    flex: 1,
    backgroundColor: colors.slateGray500,
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
