import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/registerSlice";
import dashboardSlice from "../slices/dashboardSlice";
import listSlice from "../slices/listSlice";
import taskSlice from "../slices/taskSlice";
import tagSlice from "../slices/tagSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    boards: dashboardSlice,
    lists: listSlice,
    tasks: taskSlice,
    tags: tagSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
