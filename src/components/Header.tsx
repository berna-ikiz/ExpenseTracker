import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../theme/colors";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  headerWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    elevation: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  header: {
    backgroundColor: colors.slateGray600,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: colors.ghostWhite,
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
