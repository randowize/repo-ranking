import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Language = "javascript" | "python" | "scala";

export const languageSlice = createSlice({
  name: "language",
  initialState: "javascript" as Language,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      return action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
