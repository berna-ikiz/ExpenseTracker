import { StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
  snapPoints:
    | [string]
    | [number]
    | [number, number]
    | [number, string]
    | [string, number]
    | [string, string];
};
const EmojiPickerSheet = ({
  visible,
  onClose,
  onSelect,
  snapPoints,
}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      ref={bottomSheetRef}
    >
      <BottomSheetView style={styles.container}>
        <EmojiSelector
          onEmojiSelected={onSelect}
          showSearchBar
          showTabs
          showHistory
          category={Categories.all}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default EmojiPickerSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    elevation: 5,
  },
});
