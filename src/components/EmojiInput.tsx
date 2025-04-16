import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

type Props = {
  emoji?: string;
  value?: string;
  onEndEditing: (value: string) => void;
};

const EmojiInput = ({ emoji, onEndEditing, value }: Props) => (
  <View style={styles.inputWrapper}>
    <TextInput
      style={styles.input}
      placeholder="Category name"
      value={value}
      onEndEditing={(e) => onEndEditing(e.nativeEvent.text)}
    />
    {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
  </View>
);

export default EmojiInput;

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.slateGray,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.offWhite,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: colors.slateGray,
  },
  emoji: {
    fontSize: 24,
    marginLeft: 10,
  },
});
