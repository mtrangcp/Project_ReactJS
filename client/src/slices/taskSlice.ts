import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Task } from "../utils/types";
import axios from "axios";

interface TaskState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  tasks: Task[];
  error: string | null;
}

const initialState: TaskState = {
  status: "idle",
  tasks: [],
  error: null,
};

const API_URL = "http://localhost:8080/tasks";

export const getTask = createAsyncThunk("task/get", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addTask = createAsyncThunk(
  "task/add",
  async (task: Omit<Task, "id">) => {
    const res = await axios.post(API_URL, task);
    return res.data;
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async (task: Task) => {
    const res = await axios.put(`${API_URL}/${task.id}`, task);
    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id: string) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getTask.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "fulfilled";
        state.tasks = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "get task failed";
      })
      // add task
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = "fulfilled";
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = "fulfilled";
        state.tasks = state.tasks.map((el) =>
          el.id === action.payload.id ? action.payload : el
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tasks = state.tasks.filter((el) => el.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
