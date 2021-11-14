import { combineReducers } from "@reduxjs/toolkit";

import search from "./searchSlice";
import searchResults from "./searchResultsSlice";

const reposReducer = combineReducers({ search, searchResults });

export default reposReducer;
