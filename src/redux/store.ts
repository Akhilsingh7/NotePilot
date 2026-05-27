import { configureStore } from "@reduxjs/toolkit";
import likesReducer from "./slices/likesSlice";
import notesReducer from "./slices/notesSlice";

export const store = configureStore({
  reducer: {
    likes: likesReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
