import { createSlice } from "@reduxjs/toolkit";
import {
  fulfilled,
  rejected,
  pending,
} from "../repositories/searchResultsSlice";

type AsyncOpInfo = {
  loading: boolean;
  resultCode: "success" | "error" | "unknown";
};

export const asyncOpSlice = createSlice({
  name: "AsyncOpStatus",
  initialState: { loading: false, resultCode: "unknown" } as AsyncOpInfo,
  reducers: {},
  extraReducers: {
    [pending]: (state) => {
      state.loading = true;
    },
    [fulfilled]: (state) => {
      state.resultCode = "success";
      state.loading = false;
    },
    [rejected]: (state) => {
      state.resultCode = "error";
      state.loading = false;
    },
  },
});

export default asyncOpSlice.reducer;
