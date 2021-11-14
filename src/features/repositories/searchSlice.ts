import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, SortCriterion, SortOrder } from "@core/types";

type SearchConfig = {
  language: Language;
  query: string;
  sortCriterion: SortCriterion;
  sortOrder: SortOrder;
};
export const searchSlice = createSlice({
  name: "searchParameters",
  initialState: {
    language: "javascript",
    query: "",
    sortCriterion: "stars",
    sortOrder: "desc",
  } as SearchConfig,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSortCriterion: (state, action: PayloadAction<SortCriterion>) => {
      state.sortCriterion = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setLanguage, setQuery, setSortCriterion, setSortOrder } =
  searchSlice.actions;

export default searchSlice.reducer;
