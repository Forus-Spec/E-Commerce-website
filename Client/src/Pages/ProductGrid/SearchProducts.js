import * as React from "react";
import SearchProduct from "../../Components/SearchProduct";
import styled from "styled-components";
function SearchProducts({
  onChange,
  isLoading,
  isError,
  value,
  error,
  ...otherProps
}) {
  return (
    <>
      <SearchProduct
        value={value}
        isError={isError}
        onChange={onChange}
        isLoading={isLoading}
        errorMessage={error}
        {...otherProps}
      />
      {isError ? (
        <div style={{ color: "red" }}>
          <p>There was a error:</p>
          <pre>{error}</pre>
        </div>
      ) : (
        undefined
      )}
    </>
  );
}

const SearchList = styled.div`
  background-color: white;
  padding: 10px;
`;

export default SearchProducts;
