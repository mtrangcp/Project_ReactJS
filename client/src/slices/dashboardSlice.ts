import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { Board } from "../utils/types";

interface DashboardState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  dashboards: Board[];
  error: string | null;
}

const initialState: DashboardState = {
  status: "idle",
  dashboards: [],
  error: null,
};

const API_URL = "http://localhost:8080/boards";

export const getDashboard = createAsyncThunk("dashboard/get", async () => {
  const res = await axios.get<Board[]>(API_URL);
  return res.data;
});

export const addDashboard = createAsyncThunk(
  "dashboard/add",
  async (board: Omit<Board, "id">) => {
    const res = await axios.post(API_URL, board);
    return res.data;
  }
);

export const updateDashboard = createAsyncThunk(
  "dashboard/update",
  async (board: Board) => {
    const res = await axios.put(`${API_URL}/${board.id}`, board);
    return res.data;
  }
);

export const deleteDashboard = createAsyncThunk(
  "dashboard/delete",
  async (id: string) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
);

export const dashboardSlice = createSlice({
  name: "dashBoard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        getDashboard.fulfilled,
        (state, action: PayloadAction<Board[]>) => {
          state.status = "fulfilled";
          state.dashboards = action.payload;
        }
      )
      .addCase(getDashboard.rejected, (state, action) => {
        state.status = "fulfilled";
        state.error = action.error.message || "get data failed";
      })
      // add
      .addCase(
        addDashboard.fulfilled,
        (state, action: PayloadAction<Board>) => {
          state.status = "fulfilled";
          state.dashboards.unshift(action.payload);
        }
      )
      .addCase(
        updateDashboard.fulfilled,
        (state, action: PayloadAction<Board>) => {
          state.status = "fulfilled";
          state.dashboards = state.dashboards.map((board) =>
            board.id === action.payload.id ? action.payload : board
          );
        }
      )
      .addCase(deleteDashboard.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.dashboards = state.dashboards.filter(
          (el) => el.id !== action.payload
        );
      });
  },
});

export default dashboardSlice.reducer;
