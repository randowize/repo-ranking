import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Language = "javascript" | "python" | "scala";

type SearchConfig = { language: Language; query: string };
export const searchSlice = createSlice({
  name: "language",
  initialState: { language: "javascript", query: "" } as SearchConfig,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setLanguage, setQuery } = searchSlice.actions;

export default searchSlice.reducer;
