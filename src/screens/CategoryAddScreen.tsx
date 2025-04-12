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

type Props = StaticScreenProps<{
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
}>;

const CategoryAddScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [showEmojiSheet, setShowEmojiSheet] = useState(false);
  const [data, setData] = useState(route.params.data);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CategoryList", {
              data: {
                expenses: data.expenses,
                categories: data.categories,
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
  }, [data]);

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    setShowEmojiSheet(false);
  };

  const handleSaveCategory = () => {
    if (selectedEmoji && categoryName) {
      const category = {
        id: Date.now().toString(),
        title: categoryName.trim(),
        icon: selectedEmoji,
      };
      navigation.dispatch(
        StackActions.popTo("CategoryList", { category, data: data })
      );
    } else if (!selectedEmoji) {
      Alert.alert("Please Add Emoji");
    } else if (!categoryName) {
      Alert.alert("Please add category name.");
    }
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
          <Text style={styles.buttonText}>Add Category</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addEmojiButtom}
        onPress={() => setShowEmojiSheet(true)}
      >
        <Text style={styles.addEmojiButtomText}>+</Text>
      </TouchableOpacity>
      <EmojiPickerSheet
        visible={showEmojiSheet}
        onClose={() => setShowEmojiSheet(false)}
        onSelect={handleEmojiSelect}
        snapPoints={["50%", "50%"]}
      />
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
    flex: 1,
    borderWidth: 1,
    borderColor: colors.slateGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: colors.ivory,
    color: colors.slateGray,
  },
  button: {
    backgroundColor: colors.slateGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
  },
  addEmojiButtom: {
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
  addEmojiButtomText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: "5%",
  },
});
