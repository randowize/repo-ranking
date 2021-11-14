import { useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import debounce from "debounce";
import classnames from "classnames";
import LanguageOptions from "@components/LanguageOptions";
import SearchInput from "@components/SearchInput";
import WelcomeMessage from "@components/WelcomeMessage";
import {
  setLanguage,
  setQuery,
  setSortCriterion,
  setSortOrder,
  getMatchingRepositories,
  RepositoriesTable,
} from "@features/repositories";
import { useReposState } from "@features/repositories/selector";
import { useAsyncOpState } from "@features/shared/selector";
import { SortCriterion, SortOrder, Language } from "@core/types";
import styles from "./App.module.css";

const useDebounceDispatch = <T extends Function>(dispatch: T) => {
  return useMemo(() => debounce(dispatch, 1000), [dispatch]);
};

export default function App() {
  const {
    query,
    language,
    sortCriterion,
    sortOrder,
    searchResults,
    rowPerPage,
    page,
  } = useReposState();
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
            page,
            ...conditions,
          },
          query,
        })
      );
    }
  }, [language, query, sortCriterion, sortOrder, debouncedDispatch, page]);

  const { loading, resultCode } = useAsyncOpState();
  const appClasses = classnames(styles.App, { [styles.loading]: loading });
  return (
    <div className={appClasses}>
      <div className={styles.searchSection}>
        <SearchInput
          onChange={(value) => dispatch(setQuery(value))}
          placeholder={`${language}:...`}
          value={query}
        />
        <LanguageOptions
          onLanguageSelected={onLanguageChange}
          language={language}
        />
      </div>

      {resultCode === "unknown" && !loading ? (
        <WelcomeMessage>
          <p>
            Looking for information about the most popular
            JavaScript/Python/Scala repos ?
          </p>
          <p>No Worries, RepoEye! is here to help</p>
        </WelcomeMessage>
      ) : null}
      {resultCode === "success" ? (
        <RepositoriesTable
          repos={searchResults.items}
          onSortOrderChange={onSortOrderChange}
          onSortCriterionChange={onSortCriterionChange}
          totalRepoCount={searchResults.total_count}
          page={page}
          rowPerPage={rowPerPage}
        />
      ) : resultCode === "error" ? (
        <h3>Something wrong happened</h3>
      ) : null}
      {loading ? <div className={styles.overlay} /> : null}
    </div>
  );
}
