import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlicer";
import expenseReducer from "../features/expense/expenseReducer";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    expense: expenseReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
