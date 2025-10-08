import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "../utils/types";
import axios from "axios";

interface UserState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  users: User[];
  error: string | null;
}

const initialState: UserState = {
  status: "idle",
  users: [],
  error: null,
};

const API_URL = "http://localhost:8080/users";

export const fetchData = createAsyncThunk("user/fetch", async () => {
  const res = await axios.get<User[]>(API_URL);
  return res.data;
});

export const addUser = createAsyncThunk(
  "user/add",
  async (user: Omit<User, "id">) => {
    const res = await axios.post<User>(API_URL, user);
    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (user: User) => {
    const res = await axios.put<User>(`${API_URL}/${user.id}`, user);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "fulfilled";
        state.users = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Fetch failed";
      })
      // add
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "fulfilled";
        state.users.unshift(action.payload);
      })
      // update
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "fulfilled";
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      });
  },
});

export default userSlice.reducer;
