import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import colors from "../theme/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
};

const emojis = [
  "💰",
  "💵",
  "🏦",
  "💎",
  "💸",
  "🤑",
  "🛒",
  "🛍️",
  "💳",
  "🧾",
  "📦",
  "🎁",
  "🍔",
  "🍕",
  "🥗",
  "🍽️",
  "☕",
  "🍰",
  "🍦",
  "🥤",
  "🚗",
  "🚆",
  "✈️",
  "🚲",
  "⛽",
  "🚖",
  "🎮",
  "🎧",
  "🎬",
  "🎤",
  "🎉",
  "🎶",
  "🎡",
  "💡",
  "💧",
  "🔥",
  "📱",
  "🌐",
  "🏠",
  "💊",
  "🩺",
  "🏋️",
  "🧘",
  "🍎",
  "🌍",
  "🗺️",
  "🏖️",
  "🏕️",
  "🏝️",
  "🛳️",
  "😊",
  "😢",
  "🤔",
  "😍",
  "😱",
  "🥳",
  "😴",
  "😎",
  "💪",
  "🤩",
  "✅",
  "❗",
  "⭐",
  "📊",
  "💯",
  "🔒",
  "🔔",
  "📅",
];

const EmojiPickerSheet = ({ visible, onClose, onSelect }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Pick an Emoji</Text>
          <FlatList
            data={emojis}
            numColumns={8}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                style={styles.emojiItem}
              >
                <Text style={styles.emoji}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default EmojiPickerSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  sheet: {
    backgroundColor: colors.slateGray10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  emojiItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  emoji: {
    fontSize: 26,
  },
});
