import React from "react";
import styled from "styled-components";
import Gembo from "./Gembo.png";
import { COLORS } from "../UIComponents/Constants";
import Icon from "../Icon";

const dataSlider = [
  {
    id: "23112",
    title: "Lorem ipsum",
    subTitle: "Lorem"
  },
  {
    id: "2312",
    title: "Lorem ipsum",
    subTitle: "Lorem"
  },
  {
    id: "23412",
    title: "Lorem ipsum",
    subTitle: "Lorem"
  }
];

const ButtonSlider = ({ direction, moveSlide }) => {
  const nextButton = () =>
    direction === "next" ? (
      <Next onClick={moveSlide}>
        <Icon name="right-arrow" size={16} />
      </Next>
    ) : direction === "previous" ? (
      <Previous onClick={moveSlide}>
        <Icon name="left-arrow" size={16} />
      </Previous>
    ) : (
      undefined
    );
  return nextButton;
};

const BackgroundImageSlider = () => {
  const [slideIndex, setSlideIndex] = React.useState(1);
  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = index => {
    setSlideIndex(index);
  };

  return (
    <Container>
      {/* <SearchProduct /> */}
      {dataSlider.map((obj, index) => {
        let checker = slideIndex === index + 1;
        return (
          <ActiveAnim active={checker}>
            <Image src={Gembo}></Image>
          </ActiveAnim>
        );
      })}
      <ButtonSlider moveSlide={nextSlide} direction={"next"} />
      <ButtonSlider moveSlide={prevSlide} direction={"previous"} />
      <ContainerDots>
        {Array.from({ length: 5 }).map((item, index) => {
          return slideIndex === index + 1 ? (
            <ActiveDot onClick={() => moveDot(index + 1)} />
          ) : (
            <Dot onClick={() => moveDot(index + 1)} />
          );
        })}
      </ContainerDots>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 4px;
  min-width: 900px;
  height: 492px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity ease-in-out 0.4s;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ButtonSlide = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f1f1f1;
  border: 1px solid rgba(34, 34, 34, 0.287);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ButtonImage = styled.img`
  width: 25px;
  height: 25px;
  pointer-events: none;
`;

const Previous = styled(ButtonSlide)`
  top: 50%;
  left: 20px;
  transform: translateY(-60%);
`;
const Next = styled(ButtonSlide)`
  top: 50%;
  right: 20px;
  transform: translateY(-60%);
`;

const ContainerDots = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  border-radius: 12px;
  background-image: ${COLORS.primary};
  padding: 10px;
  display: flex;
`;
const Dot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #f1f1f1;
  margin: 0 5px;
  background: #f1f1f1;
  cursor: pointer;
  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

//
const ActiveAnim = styled(Slide)``;

const ActiveDot = styled(Dot)`
  background: rgb(32, 32, 32);
`;

export default BackgroundImageSlider;
