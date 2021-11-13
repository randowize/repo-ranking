import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  searchMostPopularRepos,
  SearchResponse,
  SearchParameters,
} from "@services/github";

export const getMatchingRepositories = createAsyncThunk(
  "repos/SearchByIdLanguageAndKeyword",
  async (parameters: SearchParameters, thunkAPI) => {
    return await searchMostPopularRepos(parameters);
  }
);

// Then, handle actions in your reducers:
const repos = createSlice({
  name: "repos",
  initialState: null as unknown as SearchResponse,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getMatchingRepositories.fulfilled, (state, action) => {
      // Add user to the state array
      return action.payload;
    });
  },
});

export default repos.reducer;
