import React from "react";
import styled from "styled-components";

import { COLORS } from "../UIComponents/Constants";

const SuperHeader = () => {
  return (
    <Wrapper>
      <MarketingMessage>
        <Catcher>No surprises ? Like ever ?! </Catcher>
        <span style={{ textDecoration: "underline" }}>
          Sales up to 25% & Limited Edition Stock is
        </span>
        <Catcher> ON!</Catcher>
      </MarketingMessage>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${COLORS.white};
  background-color: ${COLORS.black};
  text-align: center;
  padding: 10px;
  font-size: 0.875rem;
`;

const Catcher = styled.span`
  color: ${COLORS.orange};
  letter-spacing: 4px;
`;

const MarketingMessage = styled.span`
  color: ${COLORS.white};
  font-size: 1rem;
`;

export default SuperHeader;
