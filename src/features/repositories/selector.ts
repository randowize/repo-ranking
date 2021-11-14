import { Language, SortCriterion, SortOrder } from "@core/types";
import { RootState } from "@store/main";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage, setSortCriterion, setSortOrder } from ".";

export const useReposState = () => {
  const language = useSelector(
    (state: RootState) => state.repos.searchSettings.language
  );
  const query = useSelector(
    (state: RootState) => state.repos.searchSettings.query
  );
  const page = useSelector(
    (state: RootState) => state.repos.searchSettings.page
  );
  const rowPerPage = useSelector(
    (state: RootState) => state.repos.searchSettings.rowPerPage
  );
  const sortCriterion = useSelector(
    (state: RootState) => state.repos.searchSettings.sortCriterion
  );
  const sortOrder = useSelector(
    (state: RootState) => state.repos.searchSettings.sortOrder
  );
  const searchResults = useSelector(
    (state: RootState) => state.repos.searchResults
  );
  return {
    searchResults,
    query,
    page,
    rowPerPage,
    sortCriterion,
    sortOrder,
    language,
  };
};
export const useDispatchers = () => {
  const dispatch = useDispatch();
  const onLanguageChange = useCallback(
    (_language: Language) => dispatch(setLanguage(_language)),
    [dispatch]
  );
  const onSortCriterionChange = useCallback(
    (_sortCriterion: SortCriterion) =>
      dispatch(setSortCriterion(_sortCriterion)),
    [dispatch]
  );
  const onSortOrderChange = useCallback(
    (_sortOrder: SortOrder) => dispatch(setSortOrder(_sortOrder)),
    [dispatch]
  );
  return { onLanguageChange, onSortCriterionChange, onSortOrderChange };
};
