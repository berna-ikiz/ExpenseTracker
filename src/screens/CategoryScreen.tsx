import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import categoryData from "../data/CategoryData";
import colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

type CategoryItemType = {
  id: string;
  title: string;
  icon: string;
};

const category = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: CategoryItemType }) => (
    <View style={styles.ListCard}>
      <TouchableOpacity style={styles.listCategoryItem}>
        <Text style={styles.listIcon}>{item.icon}</Text>
        <Text style={styles.listTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Categories</Text>
      <FlatList
        data={categoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: "20%" }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("CategoryAdd")}
        style={styles.addCategoryButton}
      >
        <Text style={styles.addCategoryButtomText}> + </Text>
      </TouchableOpacity>
    </View>
  );
};

export default category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "8%",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  ListCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "black",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 3,
  },
  listCategoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.ivory,
    borderRadius: 12,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.dimGray,
  },
  listIcon: {
    fontSize: 24,
    marginRight: "10%",
  },
  titleText: {
    fontSize: 28,
    color: colors.silver,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "4%",
  },
  addCategoryButton: {
    position: "absolute",
    right: "10%",
    bottom: "5%",
    backgroundColor: colors.gray,
    width: "20%",
    height: "8%",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addCategoryButtomText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: "5%",
  },
});
