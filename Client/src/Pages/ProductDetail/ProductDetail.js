import React from "react";
import styled from "styled-components";
import ProductCard from "../../Components/ProductCard";
import ProductCardDetail from "../../Components/ProductCard/ProductCardDetail";
import { COLORS } from "../../Components/UIComponents/Constants";
import { useQuery } from "react-query";
import { fetchProductDetail } from "../../lib/productAPI";
// it might be a slug that you need not postId
const ProductDetail = ({ postId }) => {
  const [related, setRelated] = React.useState();
  const [start, setStare] = React.useState();

  const { data, isLoading, isSuccess, isError, error } = useQuery(
    ["comments", postId],
    () => fetchProductDetail(postId)
  );

  return (
    <Wrapper>
      <ProductCardDetail />
      <Title>Related Products</Title>
      <RelatedProducts>
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </RelatedProducts>
    </Wrapper>
  );
};

const Title = styled.h1`
  margin-top: 32px;
  font-size: 2.7rem;
  color: ${COLORS.black};
`;

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const RelatedProducts = styled.div`
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
  border-radius: 20px;
  background: linear-gradient(to top, #dfe9f3 0%, white 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 180px;
`;

export default ProductDetail;
