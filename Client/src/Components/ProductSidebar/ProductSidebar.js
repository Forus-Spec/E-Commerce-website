import React from "react";
import styled from "styled-components/macro";
import { Player } from "@lottiefiles/react-lottie-player";
import SideBarAnimation from "../Animations/SideBarAnimation.json";
import {
  Slider,
  SliderInput,
  SliderTrack,
  SliderMarker,
  SliderHandle,
  SliderTrackHighlight
} from "@reach/slider";
import "@reach/slider/styles.css";
import "@reach/slider/styles.css";
import { wrapEvent } from "@reach/utils";
import { COLORS, FONTSIZE, WEIGHTS, CORNERS } from "../UIComponents/Constants";
import InputField from "../UIComponents/InputField";
import Label from "../UIComponents/Label";
import { TooltipPopup, useTooltip } from "@reach/tooltip";
import debounce from "lodash/debounce";
import { LoadingAnimation } from "../UIComponents/Spinners/LoadingAnimation";

const ProductSidebar = ({
  brands,
  isSuccessBrands,
  isLoadingBrands,
  categories,
  isSuccessCategories,
  isLoadingCategories,
  handleCategory,
  handleBrand,
  handlePrice
}) => {
  const [value, setValue] = React.useState(30);
  const callHttpRequest = (eventSrcDesc, newValue) => {
    console.log({ eventSrcDesc, newValue });
  };

  const [stateDebounceCallHttpRequest] = React.useState(() =>
    debounce(callHttpRequest, 500, {
      leading: false,
      trailing: true
    })
  );

  const handleChangeUsingStateDebounce = newValue => {
    setValue(newValue);
    stateDebounceCallHttpRequest("volume-useState", newValue);
  };

  return (
    <DecorationWrapper>
      <Wrapper>
        <Filter>
          <SectionTitle>Filter with Category</SectionTitle>
          <CheckBox>
            {categories ? (
              categories.data.categories.map(el => (
                <>
                  <InputWrapper id={el._id}>
                    <InputField
                      type="checkbox"
                      size="fit"
                      value={el._id}
                      onChange={handleCategory}
                    />
                    <Label>{el.name}</Label>
                  </InputWrapper>
                </>
              ))
            ) : isLoadingCategories ? (
              <div
                style={{
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "120px"
                }}
              >
                <LoadingAnimation />
              </div>
            ) : (
              undefined
            )}
          </CheckBox>
        </Filter>
        <Filter>
          <SectionTitle>Filter with Price</SectionTitle>
          <Slider
            style={{
              backgroundImage: `${COLORS.primary}`,
              color: "white",
              paddingBottom: "26px",
              paddingTop: "17px",
              paddingRight: "14px",
              paddingLeft: "14px",
              borderRadius: "10px",
              textAlign: "center"
            }}
            min={10}
            max={1000}
            step={30}
            onChange={newValue => handleChangeUsingStateDebounce(newValue)}
          >
            <SliderTrack>
              <SliderTrackHighlight />
              <SliderHandle>
                <span
                  style={{
                    position: "relative",
                    backgroundImage: `${COLORS.primary}`,
                    top: "28px",
                    borderRadius: `${CORNERS.medium}`,
                    padding: "3px",
                    right: "15px",
                    fontWeigh: "bold",
                    fontSize: "24px",
                    border: "2px solid orange",
                    cursor: "pointer"
                  }}
                >
                  {value}$
                </span>
              </SliderHandle>
            </SliderTrack>
          </Slider>
        </Filter>
        <Filter>
          <SectionTitle>Filter with brands</SectionTitle>
          <List>
            {brands
              ? brands.data.brands.map(el => (
                  <>
                    <InputRadio
                      onChange={handleBrand}
                      id={el._id}
                      value={el._id}
                      name="brands"
                      type="radio"
                    />
                    <CategoryItem for={el._id}>{el.name}</CategoryItem>
                  </>
                ))
              : isLoadingBrands && <LoadingAnimation />}
          </List>
        </Filter>
      </Wrapper>
      <Player
        src={SideBarAnimation}
        speed={0.8}
        loop
        autoplay
        style={{
          width: "auto",
          overflow: "hidden",
          borderRadius: `${CORNERS.normal}`
        }}
      />
    </DecorationWrapper>
  );
};

const List = styled.div`
  height: 320px;
  overflow: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const CheckBox = styled.form`
  display: flex;
  flex-direction: column;
  height: 250px;
  overflow: auto;
`;

const DecorationWrapper = styled.div`
  box-shadow: 5px 5px 10px ${COLORS.gray500};
  background-color: white;
  min-width: 360px;
  border-radius: ${CORNERS.normal};
`;

const Wrapper = styled.aside`
    padding: 28px 22px;
    background-color: white;
    min-width: 360px;
    border-radius: ${CORNERS.normal};
  `;

const Filter = styled.div`
  margin-bottom: 28px;
`;

const SectionTitle = styled.h3`
  font-size: ${FONTSIZE.large}rem;
  text-transform: uppercase;
  color: ${COLORS.black};
  margin-bottom: 20px;
`;
const InputRadio = styled.input`
  appearance: none;
  cursor: pointer;
  border:1px solid black;
  :checked + label {
    outline-offset: 3px;
    outline-width:3px ;
    outline-color:${COLORS.orange};
    color: ${COLORS.orange};
    background: ${COLORS.transparentGray15};
    /* outline: 3px inset ${COLORS.transparentGray15}; */
  }
`;

const CategoryItem = styled.label`
  margin-top: 12px;
  margin-bottom: 12px;
  text-decoration: none;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.black};
  line-height: 2;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    color: ${COLORS.gray700};
  }
`;

// const ActiveLink = styled(Link)`
//   color: ${COLORS.primary};
// `;

export default ProductSidebar;
