import AsyncStorage from "@react-native-async-storage/async-storage";

type KEY_CATEGORIES = {
  id: string;
  title: string;
  icon: string;
};
const KEY_CATEGORIES = {};

export const saveCategoryData = async (value: KEY_CATEGORIES) => {
  try {
    await AsyncStorage.setItem("KEY_CATEGORIES", JSON.stringify(value));
  } catch (e) {
    console.log("error -> save category data");
  }
};
