import React from "react";
import styled from "styled-components";
import Button from "../../Components/UIComponents/Button";

// This is FourOFour functionality which is awesome and insane and the same time
const FourOFour = () => {
  return (
    <Wrapper>
      <ErrorTitle>404</ErrorTitle>
        <ErrorText>
          Sorry you'v been wondering
          into places you shouldn't be in
        </ErrorText>
      <Button size="long">Back</Button>
    </Wrapper>
  );
};
// https://julesblom.com/notes/react-anti-patterns
const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ErrorTitle = styled.div`
  margin-bottom: -82px;
  font-size: calc(17vw + 70px);
  opacity: 0.6;
  letter-spacing: -18px;
`;
const ErrorText = styled.div`
  opacity: 0.8;
  font-size: 20px;
  font-weight: bold;
  margin: 32px;
`;
export default FourOFour;
