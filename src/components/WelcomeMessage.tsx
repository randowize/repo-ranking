import { FC } from "react";
import styled from "styled-components";

const Paragraph = styled.div`
  padding: 0.25rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  justify-content: center;
  font-size: 2.5rem;
`;

const WelcomeMessage: FC = ({ ...rest }) => {
  return <Paragraph {...rest} />;
};

export default WelcomeMessage;
