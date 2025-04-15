import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import EmojiPicker from "rn-emoji-keyboard";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
  snapPoints: Array<string | number>;
};

const EmojiPickerSheet = ({ visible, onClose, onSelect }: Props) => {
  return (
    <EmojiPicker
      open={visible}
      onClose={onClose}
      onEmojiSelected={(emojiObject) => {
        onSelect(emojiObject.emoji);
        onClose();
      }}
    />
  );
};

export default React.memo(EmojiPickerSheet);
