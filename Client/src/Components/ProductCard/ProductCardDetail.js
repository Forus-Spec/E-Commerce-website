import React from "react";
import styled from "styled-components";
import Icon from "../../Components/Icon";
import Button from "../../Components/UIComponents/Button/Button";
import NumberInput from "../../Components/UIComponents/numberInput";
import { COLORS } from "../UIComponents/Constants";
import HeartButton from "./HeartButton";

const ProductDetail = () => {
  return (
    <Wrapper>
      <ProductCard>
        <Banner>Promotion 20%</Banner>
        <HeartButton></HeartButton>
        <Stock>in Stock</Stock>
        <Category>Category</Category>
        <TitleWrapper>
          <Title>Sennheizer</Title>
          <Review aria-label="product reviews">
            <Icon name="message" />
            Reviews
          </Review>
        </TitleWrapper>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          typesetting typesetting. Lorem Ipsum is simply dummy text of the
          printing and typesetting annoyed. Lorem Ipsum has been
        </Description>
        <Footer>
          <div>
            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
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
          </div>
          <div>
            <Price>
              <PreviousPrice>$96.00</PreviousPrice>
              <b>$230.99</b>
            </Price>
            <InputFlow>
              <NumberInput />
              <Button
                size="large"
                isSuccess={true}
                onSubmit={() => {}}
                arial-label="add product"
              >
                add Cart
              </Button>
            </InputFlow>
          </div>
        </Footer>
      </ProductCard>
    </Wrapper>
  );
};

const Title = styled.h1`
  margin-top: 8px;
  display: block;
  border-radius: 8px;
  margin-bottom: 8px;
  font-weight: 800;
  font-size: 2rem;
  color: #363636;
`;

const Wrapper = styled.div`
  margin-top: 20px;
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

const InputFlow = styled.div`
  display: flex;
  gap: 20px;
`;
// this is our TitleWrapper functionality
const TitleWrapper = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
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
  margin-left: -29px;
  font-size: 1rem;
  font-weight: 800;
  background: linear-gradient(0deg, #b02e0c 0%, #eb4511 100%);
  color: rgb(255, 255, 255);
  padding: 4px 12px;
  &:after {
    content: promotion;
  }
`;

const Category = styled.div`
  display: block;
  font-size: 1.5rem;
  font-weight: 500;
  color: #363636;
`;
const Stars = styled.ol`
  margin-top: 20px;
  display: flex;
  list-style: none;
`;
const Description = styled.p`
  font-weight: 600;
  font-size: 1.1rem;
  max-width: 1000px;
`;

const Footer = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Price = styled.div`
  text-align: right;
  font-size: 1.35rem;
  color: #131313;
  font-weight: 800;
  bottom: 18px;
`;
const PreviousPrice = styled.b`
  font-size: 70%;
  font-weight: 100;
  text-decoration: line-through;
  display: block;
  margin-left: -5px;
`;
const Review = styled.div`
  display: flex;
  gap: 4px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(128, 128, 128, 0.534);
  border-bottom-style: solid;
  width: fit-content;
  color: #06060674;
  font-weight: 500;
  font-size: 22px;
  cursor: pointer;
`;
export default ProductDetail;
