import React from "react";
import styled, { keyframes, css } from "styled-components";
import Button from "../UIComponents/Button";
import HeartButton from "./HeartButton";
import { useQuery, useMutation, queryCache } from "react-query";
import { Favorites, addFavorite, deleteAvatar } from "../../lib/userAPI";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";
import { COLORS, FONTSIZE } from "../UIComponents/Constants";

// This is our awesome and amazing productCard functionality which is huge and awesome
const ProductCard = ({
    name,
    category,
    brand,
    description,
    images,
    price,
    rating,
    stock,
    productId,
    isLoading = false
}) => {
  const [detail, setDetail] = React.useState(false);
  const [time, setTime] = React.useState(false);

  const maxDescription = string =>
    typeof string === "string" ? string.substring(0, 180) + "..." : "";
  const checkIsInStock = stock => (stock > 0 ? true : false);

  // Hello my name is essayeh fares
  function timeOut(clear = false) {
    const timeOutId = setTimeout(() => {
      setTime(false);
      setDetail(false);
    }, 3000);
    return timeOutId;
  }

  return (
    <div
      onMouseEnter={() => {
        if (time === true) return;
        setDetail(() => true);
      }}
      onMouseLeave={() => {
        if (time === false) {
          setTime(() => true);
          timeOut();
        }
      }}
    >
      <Card>
        <Header>
          {checkIsInStock(stock) ? <Stock green>in Stock</Stock> : ""}
          <HeartButton
            loading={isLoading}
            productId={productId && productId}
            // Favorite={Favorite}
            // addFavorites={() => create({ productId: productId })}
            // deleteFavorites={() => remove({ productId: productId })}
          />
          <Banner skeli={isLoading}></Banner>
          <ImageWrapper skeli={isLoading}>
            <Image src={images} />
          </ImageWrapper>
        </Header>
        <Details>
          <Category skeli={isLoading}>{category}</Category>
          <Title skeli={isLoading}>{name}</Title> {/*product-title */}
          <Brand skeli={isLoading}>{brand}</Brand>
          <Stars skeli={isLoading}>
            <li>
              <Icon color="orange" name="star" />
            </li>
            <li>
              <Icon color="orange" name="star" />
            </li>
            <li>
              <Icon color="orange" name="star" />
            </li>
            <li>
              <Icon color="orange" name="star" />
            </li>
            <li>
              <Icon color="orange" name="star" />
            </li>
          </Stars>
          <Description skeli={isLoading}>
            {maxDescription(description)}
          </Description>
        </Details>
        <Footer>
          <Review skeli={isLoading} aria-label="product reviews">
            {isLoading ? (
              <span></span>
            ) : (
              <>
                <Icon name="message" />
                Reviews
              </>
            )}
          </Review>
          <Links>
            <PriceWrapper skeli={isLoading}>
              <PreviousPrice>{price}</PreviousPrice>
              <Price>{price}</Price>
            </PriceWrapper>
            {isLoading ? (
              <SkeletonButton></SkeletonButton>
            ) : (
              <Button size="medium">add Cart</Button>
            )}
          </Links>
        </Footer>
      </Card>
      {detail && !isLoading && (
        <div style={{ position: "relative" }}>
          <CheckDetail skeli={true}>
            <NavLink
              to="/products/productDetail/21321321"
              size="long"
              style={{ textDecoration: "none" }}
            >
              <Button>Check detail</Button>
            </NavLink>
          </CheckDetail>
        </div>
      )}
    </div>
  );
};

const loader = keyframes`
	from {
		background-position: 100% 0%;
	}
	to {
		background-position: -100% 0%;
	}
`;

const SkeletonButton = styled.div`
  background: linear-gradient(90deg, #ededed, #ffffff, #ededed);
  background-size: 200% 100%;
  animation: ${loader} 1s infinite reverse;
  width: 150px;
  height: 58px;
  font-size: 1.1rem;
  padding: 1px 1px;
`;
const PriceWrapper = styled.div`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  width: ${props => (props.skeli ? "100px" : "")};
  height: ${props => (props.skeli ? "80px" : "")};
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const CheckDetail = styled.div`
  width: max-content;
  transition: 0.4s;
  text-decoration: none;
  box-shadow: 0 2px 7px #dfdfdf;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-right: auto;
  margin-left: auto;
  position: absolute;
  opacity: 0.8;
  &:hover {
    top: -8px;
    opacity: 1;
    border-radius: 8px;
  }
`;

const Card = styled.article`
  position: relative;
  width: 380px;
  padding: 32px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 60px -8px hsl(210, 14%, 80%);
  border: 1px solid rgb(213, 218, 223);
  margin: 20px auto;
  background: #fafafa;
`;
const Header = styled.div`
  display: block;
  margin-bottom: 32px;
`;
const Stock = styled.div`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  width: ${props => (props.skeli ? "90px" : "fit-content")};
  height: ${props => (props.skeli ? "32px" : "")};
  padding: 2px;
  color: green;
  border-radius: 8px;
  top: -22px;
  left: -12px;
  font-size: 0.9rem;
  font-weight: 700;
  color: green;
`;
const Banner = styled.em`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  width: ${props => (props.skeli ? " 200px" : "")};
  height: ${props => (props.skeli ? " 30px" : "")};
  width: 200px;
  position: absolute;
  border-radius: 1px;
  left: -1px;
  top: 90px;
  font-size: 0.764rem;
  font-weight: 800;

  color: rgb(255, 255, 255);
  padding: 4px 12px;
`;

const ImageWrapper = styled.div`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  height: ${props => (props.skeli && "235px") || ""};
  width: auto;
  border-radius: 8px;
  margin-top: 50px;
  margin-left: -32px;
  margin-right: -32px;
  &::hover {
    opacity: 1;
    transition: 0.1s ease-in-out;
  }
`;

const Image = styled.img`
  border-top-right-radius: 11px;
  border-bottom-left-radius: 11px;
  margin-bottom: 10;
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
  background-size: "cover";
  background-repeat: "cover";
  background-position: "center";
`;
const Details = styled.section`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  text-align: left;
  margin-top: 10px;
  margin-left: -10px;
  max-width: 250px;
`;

const Ships = styled.div`
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  width: ${props => (props.skeli ? " 140px" : "")};
  height: ${props => (props.skeli ? " 30px" : "")};
  margin-top: 8px;
  display: block;
  border-radius: 8px;
  margin-bottom: 2px;
  font-weight: 500;
  color: #363636;
`;

const Category = styled(Ships)`
  width: fit-content;
  padding: 1px 8px;
  font-size: 0.96rem;
  background: ${props =>
    props.skeli
      ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)"
      : COLORS.primary};
  color: white;
  font-weight: bold;
  letter-spacing: 2px;
  opacity: 0.7;
`;
const Brand = styled(Ships)`
  padding: 1px 8px;
  font-size: 0.86rem;
  background: ${props =>
    props.skeli
      ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)"
      : COLORS.transparentGray15};
  outline: 1px solid ${COLORS.transparentGray35};
  font-weight: bold;
`;
const Title = styled.div`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  width: ${props => (props.skeli ? " 180px" : "")};
  height: ${props => (props.skeli ? " 40px" : "")};
  margin-top: 8px;
  display: block;
  border-radius: 8px;
  margin-bottom: 4px;
  font-weight: 800;
  font-size: 1.2rem;
  color: #363636;
`;

const Stars = styled.ol`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  width: ${props => (props.skeli ? " 130px" : "")};
  height: ${props => (props.skeli ? " 35px" : "")};
  margin-top: 6px;
  border-radius: 8px;
  display: flex;
  list-style: none;
  padding: 1px;
  text-align: right;
`;

const Description = styled.p`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  width: ${props => (props.skeli ? " 320px" : "")};
  height: ${props => (props.skeli ? " 42px" : "")};
  margin-top: 8px;
  margin-bottom: 0px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1px;
`;

const Footer = styled.aside`
  margin-top: 8px;
  padding: 6px;
`;

const Links = styled.div`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  margin-left: -22px;
  margin-right: -22px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Price = styled.div`
  font-size: 1.45rem;
  color: #131313;
  font-weight: bold;
`;
// this is our constant previous price functionality which is amazing and awesome
const PreviousPrice = styled.b`
  font-size: 90%;
  font-weight: 100;
  text-decoration: line-through;
  display: block;
  color: ${COLORS.gray};
  margin-left: -5px;
`;

const Review = styled.div`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  width: ${props => (props.skeli ? "100px" : "max-content")};
  height: 30px;
  margin-left: 220px;
  color: ${COLORS.orange};
  display: flex;
  gap: 8px;
  font-weight: bold;
  font-weight: 700;
  font-size: 0.8rem;
  border-radius: 6px;
  border: 1px solid ${COLORS.white};
  cursor: pointer;
  &::hover {
    background-color: "orange";
  }
`;
export default ProductCard;
