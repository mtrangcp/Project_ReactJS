import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Tag } from "../utils/types";
import axios from "axios";

interface TagState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  tags: Tag[];
  error: string | null;
}

const initialState: TagState = {
  status: "idle",
  tags: [],
  error: null,
};

const API_URL = "http://localhost:8080/tags";

export const getTag = createAsyncThunk("tag/get", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addTag = createAsyncThunk(
  "tag/add",
  async (tag: Omit<Tag, "id">) => {
    const res = await axios.post(API_URL, tag);
    return res.data;
  }
);

export const updateTag = createAsyncThunk("tag/update", async (tag: Tag) => {
  const res = await axios.put(`${API_URL}/${tag.id}`, tag);
  return res.data;
});

export const deleteTag = createAsyncThunk("tag/delete", async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
});

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTag.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getTag.fulfilled, (state, action: PayloadAction<Tag[]>) => {
        state.status = "fulfilled";
        state.tags = action.payload;
      })
      .addCase(getTag.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "get tag failed";
      })
      // add tag
      .addCase(addTag.fulfilled, (state, action: PayloadAction<Tag>) => {
        state.status = "fulfilled";
        state.tags.unshift(action.payload);
      })
      .addCase(updateTag.fulfilled, (state, action: PayloadAction<Tag>) => {
        state.status = "fulfilled";
        state.tags = state.tags.map((el) =>
          el.id === action.payload.id ? action.payload : el
        );
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tags = state.tags.filter((el) => el.id !== action.payload);
      });
  },
});

export default tagSlice.reducer;
