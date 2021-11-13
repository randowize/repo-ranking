import { useEffect, useState, FC, Fragment } from "react";
import styled from "styled-components";
import { SearchResponse, searchMostPopularReposBy } from "@services/github";

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

const Result: FC<{ response?: SearchResponse }> = ({ response }) => {
  if (!response) return null;
  return (
    <ResponseContainer>
      {response.items.map((repo) => (
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

type Language = "javascript" | "python" | "scala";
export default function App() {
  const [language, setLanguage] = useState<Language>("javascript");
  const [response, setResponse] = useState<SearchResponse>();
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (language && query) {
      searchMostPopularReposBy(
        query,
        { language, stars: ">10000" },
        setResponse
      );
    }
  }, [language, query]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search[${language}]repositories `}
      />
      <LanguageOptions onLanguageSelected={setLanguage} language={language} />
      <Result response={response} />
    </div>
  );
}
