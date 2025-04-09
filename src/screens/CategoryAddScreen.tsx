import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../theme/colors";

const CategoryAddScreen = () => {
  const [categoryName, setCategoryName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Category</Text>
      <View style={styles.categoryAddLayout}>
        <TextInput
          style={styles.input}
          placeholder="Category name"
          value={categoryName}
        />
        <TouchableOpacity style={styles.imojiButton}>
          <Text style={styles.imojiButtonText}>Add Icon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  categoryAddLayout: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    padding: 10,
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
  },
  imojiButton: {
    backgroundColor: colors.slateGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  imojiButtonText: {
    fontSize: 20,
    color: colors.white,
  },
});
