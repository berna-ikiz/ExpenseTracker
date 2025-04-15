import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../theme/colors";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    color: colors.dimGray,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "4%",
    shadowColor: colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: colors.dimGray,
    fontSize: 28,
    fontWeight: "bold",
  },
});
