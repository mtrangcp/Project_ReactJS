import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { List } from "../utils/types";
import axios from "axios";

interface ListState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  lists: List[];
  error: string | null;
}

const initialState: ListState = {
  status: "idle",
  lists: [],
  error: null,
};

const API_URL = "http://localhost:8080/lists";

export const getList = createAsyncThunk("list/get", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addList = createAsyncThunk(
  "list/add",
  async (list: Omit<List, "id">) => {
    const res = await axios.post(API_URL, list);
    return res.data;
  }
);

export const updateList = createAsyncThunk(
  "list/update",
  async (list: List) => {
    const res = await axios.put(`${API_URL}/${list.id}`, list);
    return res.data;
  }
);

export const deleteList = createAsyncThunk(
  "list/delete",
  async (id: string) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getList.fulfilled, (state, action: PayloadAction<List[]>) => {
        state.status = "fulfilled";
        state.lists = action.payload;
      })
      .addCase(getList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "get list failed";
      })
      // add list
      .addCase(addList.fulfilled, (state, action: PayloadAction<List>) => {
        state.status = "fulfilled";
        state.lists.unshift(action.payload);
      })
      .addCase(updateList.fulfilled, (state, action: PayloadAction<List>) => {
        state.status = "fulfilled";
        state.lists = state.lists.map((el) =>
          el.id === action.payload.id ? action.payload : el
        );
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.lists = state.lists.filter((el) => el.id !== action.payload);
      });
  },
});

export default listSlice.reducer;
