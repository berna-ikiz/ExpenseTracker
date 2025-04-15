import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import colors from "../theme/colors";
import { BackIcon } from "../utils/Icons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  backTarget?: string;
  data?: any;
  rightButtonTitle: string;
  onRightButtonPress: () => void;
  rightButtonIcon?: ReactNode;
};

type ScreenName =
  | "Home"
  | "CategoryList"
  | "Expense"
  | "ExpenseDetails"
  | "CategoryAdd"
  | "CategoryList"
  | "CategoryExpensesScreen";

const CustomFooter = ({
  rightButtonTitle,
  backTarget,
  data,
  onRightButtonPress,
  rightButtonIcon,
}: Props) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate(backTarget as ScreenName, {
      ...(data && { data }),
    });
  };
  return (
    <View style={styles.container}>
      {backTarget && (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <BackIcon size={20} color={colors.gray} />
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      )}
      {rightButtonTitle && (
        <TouchableOpacity onPress={onRightButtonPress} style={styles.button}>
          {rightButtonIcon}
          <Text style={styles.buttonText}>{rightButtonTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderColor: colors.ghostWhite,
    backgroundColor: colors.ghostWhite,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
  buttonText: {
    color: colors.gray,
    fontSize: 20,
    fontWeight: "600",
    alignItems: "center",
  },
});
