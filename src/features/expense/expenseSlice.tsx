import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ExpenseItemType } from "../../types";

export interface ExpensesState {
  expenses: ExpenseItemType[];
}

const initialState: ExpensesState = {
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<ExpenseItemType>) => {
      state.expenses = [...state.expenses, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
