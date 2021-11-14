import { FC } from "react";
import styled from "styled-components";

const Input = styled.input`
  border-radius: 4px;
  border: solid 1px #ddd;
  padding: 0.25rem 0.5rem;
  min-height: 48px;
  flex: 1;
  max-width: 300px;
  @media (max-width: 800px) {
    max-width: 100%;
  }
`;

type Props = {
  onChange: (query: string) => void;
  placeholder: string;
  value: string;
};
const SearchInput: FC<Props> = ({ onChange, ...rest }) => {
  return <Input onChange={(e) => onChange(e.target.value)} {...rest} />;
};

export default SearchInput;
