import { combineReducers } from "@reduxjs/toolkit";

import searchSettings from "./searchSettingsSlice";
import searchResults from "./searchResultsSlice";

const reposReducer = combineReducers({ searchSettings, searchResults });

export default reposReducer;
