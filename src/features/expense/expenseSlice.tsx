import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ExpenseItemType } from "../../types";

export interface ExpensesState {
  expenses: ExpenseItemType[];
  total: number;
}

const initialState: ExpensesState = {
  expenses: [],
  total: 0,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<ExpenseItemType>) => {
      state.expenses = [...state.expenses, action.payload];
    },
    sortExpenses: (state) => {
      state.expenses.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
    setExpenses: (state, action: PayloadAction<ExpenseItemType[]>) => {
      state.expenses = action.payload.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
    calculateTotalExpense: (state) => {
      state.total = state.expenses.reduce((sum, expense) => {
        const value = parseFloat(expense.coast.toString());
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
    },
    deleteExpense: (state, action: PayloadAction<ExpenseItemType>) => {
      state.expenses = state.expenses.filter((item) => {
        item.id !== action.payload.id;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setExpense,
  sortExpenses,
  calculateTotalExpense,
  deleteExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
