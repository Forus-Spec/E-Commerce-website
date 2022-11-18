import { COLORS } from "../../Components/UIComponents/Constants";
import styled from 'styled-components';
import React from 'react';
import { useQuery } from "react-query";
import { getBrand, getCategory } from "../../lib/productAPI";
import Button from '../../Components/UIComponents/Button/Button'
import Icon from "../../Components/Icon";

const ProductItem = ({name,categoryId,brandId,price,description,imageUrl}={}) => {

  console.group("Filtering Id");
  console.log("CategoryId",categoryId && categoryId);
  console.log("BrandId", brandId && brandId);
  console.log("Price", price);
  console.log("Name", name);
  console.groupEnd("Awesome");

  const {
    data:brandData ,
    isLoading:isLoadingBrand,
    isSuccess:isSuccessBrand}  = useQuery(["brand"],() => {
    return  getBrand(brandId);
  },{
    enabled:!!brandId
  })
  // This is our categoryData functionality
  const {
  data:categoryData,
  isLoading:isLoadingCategory,
  isSuccess:isSuccessCategory} = useQuery(["category"],() => {
    return  getCategory(categoryId);
  },{
    enabled:!!categoryId
  })
  console.group("Category & brand");
  console.log("isCategoryLoading",isLoadingCategory);
  console.log(isSuccessBrand   && brandData);
  console.log(isSuccessCategory && categoryData);
  console.log("Image url 🎴",imageUrl);
  console.groupEnd();

  return (
    <Wrapper>
      <ProductCard>
    <MainHeaderWrapper>
    <ImageCover src={imageUrl && imageUrl} alt={name} />
      <SubHeaderWrapper>
          <Title>Product: {name}</Title>
        <FilteringWrapper>
          <Category>Category: {isLoadingCategory && "Loading" || isSuccessCategory && categoryData.data.name}</Category>
          <Category>Brand: {isLoadingBrand && "Loading" || isSuccessBrand && brandData.data.name}</Category>
        </FilteringWrapper>
      </SubHeaderWrapper>
    </MainHeaderWrapper>
        <Description>
          {description}
        </Description>
            <Stars>
              <li>
                <Icon size={32} name="star" />
              </li>
              <li>
                <Icon size={32} name="star" />
              </li>
              <li>
                <Icon size={32} name="star" />
              </li>
              <li>
                <Icon size={32} name="star" />
              </li>
              <li>
                <Icon size={32} name="star" />
              </li>
            </Stars>
            <br></br>
            <FooterWrapper>
            <Price>
              <b>Price: {price}$</b>
            </Price>
            <div>

              <Button
                size="large"
                variant="outline"
                onSubmit={() => {}}
                arial-label="add product"
              >
                Remove
              </Button>
              <Button
                size="large"
                onSubmit={() => {}}
                arial-label="add product"
              >
                Add Cart
              </Button>
            </div>
            </FooterWrapper>
      </ProductCard>
    </Wrapper>
  );
};

const FooterWrapper = styled.div`
  display:flex;
  justify-content:space-between ;
  align-items:baseline ;
`
const SubHeaderWrapper = styled.div`
border:1px solid black;
padding:10px;
border-color:${COLORS.orange};
border-radius:9px ;
`
const MainHeaderWrapper = styled.div`
  display:flex;
  flex-direction:row-reverse ;
  justify-content:space-between ;
  align-items:center ;
`
const Title = styled.h1`
  margin-top: 8px;
  display: block;
  font-weight: 800;
  font-size: 1.8rem;
  color: ${COLORS.orange};
`;

const FilteringWrapper = styled.div`
display:flex;
justify-content:row;
gap:30px;
`

const Wrapper = styled.div`
  margin-top: 10px;
  padding: 8px;
  background-image: ${COLORS.primary};
  border-radius: 8px;
  /* display:flex;
flex-direction:row ; */
  /* flex:1; */
  /* gap:180px; */
  /* margin-left:480px; */
  width: fit-content;
  margin-right: auto;
  margin-left: auto;
`;
// This is our imageCover functionality
const ImageCover = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center right;
`


const InputFlow = styled.div`
`;
// this is our TitleWrapper functionality
const TitleWrapper = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content:center ;
  gap: 20px;
`;

const ProductCard = styled.article`
  background-color: ${COLORS.white};
  position: relative;
  min-width: 1120px;
  padding: 22px;
  border-radius: 8px;
  box-shadow: 0 2px 7px #dfdfdf;
  text-align: left;
`;

const Stock = styled.div`
  color: ${COLORS.green};
  font-size: 1.5rem;
  font-weight: 700;
  width: max-content;
`;

const Banner = styled.em`
  margin-bottom: 8px;
  border-radius: 1px;
  margin-left: -2px;
  font-size: 1rem;
  font-weight: 800;
  background: linear-gradient(0deg, #b02e0c 0%, #eb4511 100%);
  color: rgb(255, 255, 255);
  padding: 4px 12px;
  &:after {
    content: promotion;
  }
`;
// This is our category functionality which is huge and awesome
const Category = styled.div`
  display: block;
  font-size: 1.3rem;
  font-weight: 500;
  color: #363636;
  margin-bottom:10px;
  width:fit-content;
  padding:10px;
  border-radius:18px;
  background-color:${COLORS.transparentGray15} ;
`;
const Stars = styled.ol`
  margin-top: 10px;
  display: flex;
  list-style: none;
`;
const Description = styled.p`
  font-weight: 600;
  font-size: 1.01rem;
  max-width: 1000px;
`;

const Price = styled.div`
  font-size: 1.35rem;
  color: #131313;
  font-weight: 800;
`;



export default ProductItem;
