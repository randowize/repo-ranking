import { useEffect, useState, useCallback, useMemo, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "debounce";
import { RootState } from "@store/main";
import styled from "styled-components";
import { SearchResponse } from "@services/github";
import { setLanguage } from "@features/language";
import { getMatchingRepositories } from "@features/repos";

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

const Result: FC<{ repos?: SearchResponse }> = ({ repos }) => {
  if (!repos) return null;
  return (
    <ResponseContainer>
      {repos.items.map((repo) => (
        <div key={repo.id}>
          <span>{repo.name}</span>
          <span>({repo.stargazers_count})</span>
        </div>
      ))}
    </ResponseContainer>
  );
};

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

type Language = "javascript" | "python" | "scala";

export default function App() {
  const [query, setQuery] = useState("");
  const language = useSelector((state: RootState) => state.language);
  const repos = useSelector((state: RootState) => state.repos);
  const dispatch = useDispatch();
  const onLanguageSelected = useCallback(
    (lang: Language) => dispatch(setLanguage(lang)),
    [dispatch]
  );
  const debouncedDispatch = useDebounceDispatch(dispatch);
  useEffect(() => {
    if (language && query) {
      debouncedDispatch(
        getMatchingRepositories({
          qualifiers: { language, stars: ">10000" },
          query,
        })
      );
    }
  }, [language, query, debouncedDispatch]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`${language}:...`}
      />
      <LanguageOptions
        onLanguageSelected={onLanguageSelected}
        language={language}
      />
      <Result repos={repos} />
    </div>
  );
}
