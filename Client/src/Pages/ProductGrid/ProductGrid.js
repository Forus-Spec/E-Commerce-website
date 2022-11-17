import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import ProductCard from "../../Components/ProductCard";
import { fetchProducts } from "../../lib/productAPI";
import SearchProducts from "./SearchProducts";
import Select from "../../Components/Select";
import { useSearchParams } from "react-router-dom";

const ProductGrid = ({ data, isLoading, dataType }) => {

  const skeletons = number => {
    return Array(number)
      .fill()
      .map(() => (
        <ProductWrapper>
          <ProductCard isLoading={true} />
        </ProductWrapper>
      ));
  };

  return (
    <>
      <Wrapper>
        {isLoading && skeletons(7)}
        {data && !data.length !== 0
          ? data.map(el => (
              <ProductWrapper>
                <ProductCard
                  name={el.name}
                  productId={el._id}
                  category={el.category.name}
                  brand={el.brand.name}
                  price={el.price}
                  description={el.description}
                  stock={el.stock}
                  images={el.images[0]}
                  isLoading={false}
                />
              </ProductWrapper>
            ))
          : undefined}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  height: 1800px;
  gap: 95px;
`;
const ProductWrapper = styled.div`
  min-width: 265px;
  flex: 1;
`;

export default ProductGrid;
