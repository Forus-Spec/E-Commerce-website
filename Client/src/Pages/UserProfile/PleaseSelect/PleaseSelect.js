import React from "react";
import styled from "styled-components";
import { COLORS } from "../../../Components/UIComponents/Constants";
import { Wrapper } from "../Wrapper";

const PleaseSelect = ({ userInformation }) => {
  return (
    <Wrapper>
      <Title>Hello Fares Essayeh we wish an awesome Day</Title>
      <Aside>Please select anything from the menu side bar</Aside>
    </Wrapper>
  );
};

const Aside = styled.div`
  font-size: 1.4rem;
  color: ${COLORS.black};
`;

const Title = styled.h1`
  font-size: 1.9rem;
  color: ${COLORS.black};
`;

export default PleaseSelect;
