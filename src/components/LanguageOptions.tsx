import { FC } from "react";
import styled from "styled-components";
import { Language } from "@core/types";

const LanguageOptionsContainer = styled.fieldset`
  display: inline-flex;
  gap: 20px;
  padding: 16px;
  border-radius: 4px;
  border: solid 1px #ccc;
  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  @media (max-width: 800px) {
    justify-content: space-around;
  }
`;

const LanguageOptions: FC<{
  onLanguageSelected?: (lang: Language) => void;
  language: Language;
}> = ({ onLanguageSelected, language }) => {
  const languages: Language[] = ["javascript", "python", "scala"];

  return (
    <LanguageOptionsContainer>
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

export default LanguageOptions;
