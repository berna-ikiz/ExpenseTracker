import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

type CategoryItemType = {
  id: string;
  title: string;
  icon: string;
};

type ExpenseItemType = {
  id: string;
  category: string;
  coast: number;
  date: string;
};

type Props = {
  snapPoints:
    | [string]
    | [number]
    | [number, number]
    | [number, string]
    | [string, number]
    | [string, string];
  data: { categories: CategoryItemType[]; expenses: ExpenseItemType[] };
};

const HomeButtonList = ({ snapPoints, data }: Props) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [categories, setCategories] = useState<CategoryItemType[]>(
    data.categories
  );

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  //When return is called from navigated page, home funtion was opened before called this func. before navigating other pages
  const closeSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <TouchableOpacity onPress={openSheet} style={styles.addExpenseButton}>
        <Text style={styles.addExpenseButtonText}> +</Text>
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Expense", {
                data: {
                  categories: data.categories,
                  expenses: data.expenses,
                },
              })
            }
          >
            <Text style={styles.input}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Category", {
                data: { categories: data.categories, expenses: data.expenses },
              })
            }
          >
            <Text style={styles.input}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CategoryAdd")}>
            <Text style={styles.input}>Add Category</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity onPress={() => navigation.navigate("Category")}>
            <Text style={styles.input}>Settings</Text>
          </TouchableOpacity>
          */}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default HomeButtonList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addExpenseButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: colors.gray,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addExpenseButtonText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: "5%",
  },
  bottomSheet: {
    marginBottom: 0,
    zIndex: 100,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: colors.white,
    height: "100%",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.slateGray,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 24,
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
});
