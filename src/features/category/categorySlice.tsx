import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CategoryItemType } from "../../types";
import categoryData from "../../data/CategoryData";

export interface CategoriesState {
  categories: CategoryItemType[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryItemType>) => {
      state.categories = [...state.categories, action.payload];
    },
    loadMockCategoryData: (state) => {
      state.categories = categoryData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, loadMockCategoryData } = categorySlice.actions;

export default categorySlice.reducer;
