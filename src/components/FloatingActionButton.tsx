import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
} from "react-native";
import { AddIcon, CategoryIcon, HomeIcon } from "../utils/Icons";

import colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { CategoryItemType, ExpenseItemType } from "../types";

type Props = {
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
};

const FloatingActionButton = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      {isOpen && (
        <>
          <TouchableOpacity
            style={[styles.optionButton, { bottom: 160 }]}
            onPress={() => {
              setIsOpen(false);
              navigation.navigate("Expense", { data });
            }}
          >
            <AddIcon size={20} color={colors.slateGray10} />
            <Text style={styles.optionText}>Add Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, { bottom: 100 }]}
            onPress={() => {
              setIsOpen(false);
              navigation.navigate("CategoryAdd", { data });
            }}
          >
            <CategoryIcon size={20} color={colors.slateGray10} />
            <Text style={styles.optionText}>Add Category</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, { bottom: 40 }]}
            onPress={() => {
              setIsOpen(false);
              navigation.navigate("CategoryList", { data });
            }}
          >
            <HomeIcon size={20} color={colors.slateGray10} />
            <Text style={styles.optionText}>Categories</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <AddIcon size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 30,
    alignItems: "flex-end",
  },
  fab: {
    backgroundColor: colors.slateGray600,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  optionButton: {
    position: "absolute",
    right: 0,
    backgroundColor: colors.slateGray500,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.slateGray,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: 180,
    height: 56,
    marginBottom: 24,
  },
  optionText: {
    marginLeft: 10,
    color: colors.slateGray10,
    fontSize: 20,
    fontWeight: "600",
  },
});
