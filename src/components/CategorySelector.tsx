import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import React from "react";
import colors from "../theme/colors";

type Category = {
  id: string;
  title: string;
  icon: string;
};

type Props = {
  selectedCategory: Category | null;
  onSelect: (emoji: string) => void;
  categoriesData: Category[];
  onPress: () => void;
  visible: boolean;
  onClose: () => void;
};

type RenderItemProps = {
  item: Category;
  onSelect: (emoji: string) => void;
  onClose: () => void;
};

const renderItem = ({ item, onSelect, onClose }: RenderItemProps) => {
  const handleSelect = (category: string) => {
    onSelect(category);
    onClose();
  };
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

const CategorySelector = ({
  selectedCategory,
  onSelect,
  categoriesData,
  onPress,
  visible,
  onClose,
}: Props) => {
  console.log(categoriesData);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectorButton} onPress={onPress}>
        <Text style={styles.selectorText}>
          {selectedCategory
            ? `${selectedCategory.icon} ${selectedCategory.title}`
            : "Select Category"}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <View style={styles.sheet}>
            <FlatList
              data={categoriesData}
              renderItem={({ item }) => renderItem({ item, onSelect, onClose })}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingBottom: "20%",
              }}
              extraData={categoriesData}
              showsVerticalScrollIndicator={true}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  sheetContent: {
    padding: 8,
  },
  categoryText: {
    fontSize: 24,
  },
  selectorButton: {
    borderWidth: 1,
    borderColor: colors.slateGray600,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 24,
    borderRadius: 10,
    backgroundColor: colors.white,
    color: colors.slateGray,
  },
  selectorText: {
    fontSize: 24,
    color: colors.slateGray600,
  },
});
