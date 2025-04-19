import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CategoryItemType } from "../../types";

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
  },
});

// Action creators are generated for each case reducer function
export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
