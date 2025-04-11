import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import colors from "../theme/colors";

type Category = {
  id: string;
  title: string;
  icon: string;
};

type Props = {
  selectedCategory: Category | null;
  onSelect: (emoji: string) => void;
  snapPoints:
    | [string]
    | [number]
    | [number, number]
    | [number, string]
    | [string, number]
    | [string, string];
  categoriesData: Category[];
  bottomSheetRef: React.RefObject<BottomSheet> | null;
  onPress: () => void;
};

const CategorySelector = ({
  selectedCategory,
  onSelect,
  snapPoints,
  categoriesData,
  bottomSheetRef,
  onPress,
}: Props) => {
  const handleSelect = (category: string) => {
    onSelect(category);
    if (bottomSheetRef?.current) {
      bottomSheetRef.current.close();
    }
  };

  const renderItem = ({ item }: { item: Category }) => {
    return (
      <TouchableOpacity
        style={styles.sheetContent}
        key={item.id}
        onPress={() => handleSelect(item.icon)}
      >
        <Text style={styles.categoryText}>
          {item.icon} {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectorButton} onPress={onPress}>
        <Text style={styles.selectorText}>
          {selectedCategory
            ? `${selectedCategory.icon} ${selectedCategory.title}`
            : "Select Category"}{" "}
        </Text>
      </TouchableOpacity>
      <BottomSheet
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        style={styles.bottomSheet}
        detached={false}
        index={-1}
      >
        <BottomSheetView style={styles.sheetContainer}>
          <FlatList
            data={categoriesData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingBottom: "20%",
            }}
            style={{ flex: 1 }}
            nestedScrollEnabled
            showsVerticalScrollIndicator={true}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetContent: {
    padding: 8,
  },
  categoryText: {
    fontSize: 24,
  },
  selectorButton: {
    borderWidth: 1,
    borderColor: colors.slateGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 24,
    borderRadius: 10,
    backgroundColor: colors.ivory,
    color: colors.slateGray,
    shadowColor: colors.slateGray,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  selectorText: {
    fontSize: 24,
    color: colors.slateGray,
  },
  bottomSheet: {
    marginBottom: 0,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: colors.ivory,
    height: "100%",
  },
});
