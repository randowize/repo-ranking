import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, SortCriterion, SortOrder } from "@core/types";

type SearchConfig = {
  language: Language;
  query: string;
  sortCriterion: SortCriterion;
  sortOrder: SortOrder;
  page: number;
  rowPerPage: number;
};
export const searchSlice = createSlice({
  name: "searchParameters",
  initialState: {
    language: "javascript",
    query: "",
    sortCriterion: "stars",
    sortOrder: "desc",
    page: 1,
    rowPerPage: 10,
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
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowPerPage: (state, action: PayloadAction<number>) => {
      state.rowPerPage = action.payload;
    },
  },
});

export const {
  setLanguage,
  setQuery,
  setSortCriterion,
  setSortOrder,
  setPage,
  setRowPerPage,
} = searchSlice.actions;

export default searchSlice.reducer;
