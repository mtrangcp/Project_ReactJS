import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/registerSlice";
import dashboardSlice from "../slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    boards: dashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
