import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";
import { BackIcon } from "../utils/Icons";
type Props = {
  onPress: () => void;
  zIndex?: number;
};

type ScreenName =
  | "Home"
  | "CategoryList"
  | "Expense"
  | "ExpenseDetails"
  | "CategoryAdd"
  | "CategoryList"
  | "CategoryExpensesScreen";

const BackButton = ({ onPress, zIndex }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.backButton, { zIndex: zIndex }]}
      onPress={onPress}
    >
      <BackIcon size={24} color={colors.ghostWhite} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 24,
    bottom: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.slateGray500,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  backText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default BackButton;
