import React from "react";
import styled from "styled-components";
import Button from "../UIComponents/Button";
import { COLORS } from "../UIComponents/Constants";
import SearchInput from "../UIComponents/SearchInput";
import Icon from "../Icon";
//  This is our SearchProduct functionality which is amazing
const SearchProduct = ({
  value,
  onChange,
  isLoading,
  isError = null,
  errorMessage = ""
}) => {
  return (
    <DecorationWrapper>
      <MainWrapper onChange={onChange}>
        <Button size="small" type="submit" isLoading={isLoading}>
          Search
        </Button>
        <SearchInput
          isLabeled={false}
          value={value}
          placeHolder="Product name"
          size="small"
        >
          Search
        </SearchInput>
      </MainWrapper>
      {isError && (
        <ErrorMessage>
          {errorMessage}
          <Icon name="alert-circle" />
        </ErrorMessage>
      )}
    </DecorationWrapper>
  );
};

const ErrorMessage = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #001932;
  font-weight: bold;
  background-image: ${COLORS.ternary};
  margin-top: 18px;
  margin-left: 4px;
  height: 0px;
`;

const DecorationWrapper = styled.div`
  width: 820px;
  background-color: white;
  border-radius: 6px;
  padding: 8px 12px;
  background: linear-gradient(
    177.9deg,
    rgb(58, 62, 88) 3.6%,
    rgb(119, 127, 148) 105.8%
  );
`;
const MainWrapper = styled.form`
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  padding: 3px;
  background-color: white;
  width: 100%;
`;

export default SearchProduct;
