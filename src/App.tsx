import { useEffect, useState, useCallback, useMemo, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "debounce";
import { RootState } from "@store/main";
import styled from "styled-components";
import {
  setLanguage,
  setQuery,
  setSortCriterion,
  setSortOrder,
  getMatchingRepositories,
  RepositoriesTable,
} from "@features/repositories";
import { SortCriterion, SortOrder, Language } from "@core/types";

const ResponseContainer = styled.div`
  margin-top: 32px;
`;
// import { query, queryResource } from "./services";
const LanguageOptionsContainer = styled.fieldset`
  display: inline-flex;
  gap: 20px;
  padding: 16px;
  border-radius: 4px;
  border: #ccc 1px solid;
  legend {
    background-color: teal;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
  }
`;

const LanguageOptions: FC<{
  onLanguageSelected?: (lang: Language) => void;
  language: Language;
}> = ({ onLanguageSelected, language }) => {
  const languages: Language[] = ["javascript", "python", "scala"];

  return (
    <LanguageOptionsContainer>
      <legend>Select a language</legend>

      {languages.map((lang) => (
        <div key={lang}>
          <input
            type="radio"
            id={lang}
            name="language"
            value={lang}
            checked={lang === language}
            onChange={(e) => onLanguageSelected?.(e.target.value as Language)}
          />
          <label htmlFor={lang}>{lang}</label>
        </div>
      ))}
    </LanguageOptionsContainer>
  );
};

const useDebounceDispatch = <T extends Function>(dispatch: T) => {
  return useMemo(() => debounce(dispatch, 1000), [dispatch]);
};

export default function App() {
  const language = useSelector(
    (state: RootState) => state.repos.search.language
  );
  const query = useSelector((state: RootState) => state.repos.search.query);
  const sortCriterion = useSelector(
    (state: RootState) => state.repos.search.sortCriterion
  );
  const sortOrder = useSelector(
    (state: RootState) => state.repos.search.sortOrder
  );
  const searchResults = useSelector(
    (state: RootState) => state.repos.searchResults
  );
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
  const debouncedDispatch = useDebounceDispatch(dispatch);
  useEffect(() => {
    if (language && query && sortCriterion && sortOrder) {
      // This is necessary otherwise github api responses are inconsistent
      const conditions =
        sortCriterion === "updated" ? {} : { sortValue: ">1000" };
      debouncedDispatch(
        getMatchingRepositories({
          params: {
            language,
            sort: sortCriterion,
            order: sortOrder,
            ...conditions,
          },
          query,
        })
      );
    }
  }, [language, query, sortCriterion, sortOrder, debouncedDispatch]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder={`${language}:...`}
        value={query}
      />
      <LanguageOptions
        onLanguageSelected={onLanguageChange}
        language={language}
      />

      {!searchResults ? null : (
        <RepositoriesTable
          repos={searchResults.items}
          onSortOrderChange={onSortOrderChange}
          onSortCriterionChange={onSortCriterionChange}
        />
      )}
    </div>
  );
}
