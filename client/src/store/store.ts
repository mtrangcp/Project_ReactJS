import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/registerSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
