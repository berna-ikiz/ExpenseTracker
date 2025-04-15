import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";
import { BackIcon } from "../utils/Icons";
type Props = {
  backTarget?: string;
  data?: any;
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

const BackButton = ({ data, backTarget, zIndex }: Props) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate(backTarget as ScreenName, {
      ...(data && { data }),
    });
  };

  return (
    <TouchableOpacity
      style={[styles.backButton, { zIndex: zIndex }]}
      onPress={handleBack}
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
    backgroundColor: colors.slateGray,
    shadowColor: colors.slateGray,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 0,
    zIndex: 0,
  },
  backText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default BackButton;
