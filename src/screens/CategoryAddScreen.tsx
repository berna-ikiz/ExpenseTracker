import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../theme/colors";
import EmojiPickerSheet from "../components/EmojiPickerSheet";
import { saveCategoryData } from "../utils/Storage";

const CategoryAddScreen = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [showEmojiSheet, setShowEmojiSheet] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    console.log(selectedEmoji);
    setShowEmojiSheet(false);
  };

  const handleSaveCategory = async () => {
    if (selectedEmoji && categoryName) {
      const newCategory = {
        id: Date.now().toString(),
        title: categoryName.trim(),
        icon: selectedEmoji,
      };
      await saveCategoryData(newCategory);
    } else if (!selectedEmoji) {
      Alert.alert("Please Add Emoji");
    } else if (!categoryName) {
      Alert.alert("Please add category name.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {categoryName ? categoryName : "Add Category"}
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
        snapPoints={["50%", "100%"]}
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
