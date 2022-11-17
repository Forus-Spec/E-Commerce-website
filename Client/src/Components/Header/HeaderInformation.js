import React from "react";
import styled, { keyframes } from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import SuccessfullyRegisteredAnimation from "../Animations/SuccessfullyRegisteredAnimation.json";
import { COLORS } from "../UIComponents/Constants";
import BackgroundImageSlider from "./backgroundImageSlider";

const SuccessfullyRegistered = () => {
  return (
    <>
      <AnimationWrapper>
        <Player
          src={SuccessfullyRegisteredAnimation}
          className="player"
          autoplay
          speed={0.8}
          style={{ height: "116px", width: "116px" }}
        />
      </AnimationWrapper>
    </>
  );
};
//  This is our HeaderInformations functionality
const HeaderInformation = ({
  pageTitle = "",
  text = "",
  pageError = false,
  successHeader = false,
  setSuccessHeader,
  pathName = ""
}) => {
  // This is our React.useEffect functionality which is huge and awesome
  React.useEffect(() => {
    setTimeout(() => {
      setSuccessHeader(false);
    }, 5000);
  }, [successHeader]);

  const successfullyRegisteredTitle = (
    message = "Successfully Registered Welcome !"
  ) => (successHeader ? message : pathName || "Not Found");

  const successfullyRegisteredComponent = () => successHeader ? <SuccessfullyRegistered /> : undefined;

  if (pathName === "Products") {
    return (
      <>
        <BackgroundImageSlider />
      </>
    );
  }
  return (
    <>
      {!pageError && (
        <UpperWrapper>
          <Wrapper isSuccess={successHeader}>
            <Box>
              {successfullyRegisteredTitle()}
              {successfullyRegisteredComponent()}
            </Box>
          </Wrapper>
        </UpperWrapper>
      )}
    </>
  );
};

const UpperWrapper = styled.div`
  padding: 0;
  position: relative;
  display: grid;
  place-content: center;
`;

const Wrapper = styled.div`
  margin-top: 10px;
  --radius: 16px;
  --padding: 8px;
  min-width: 1900px;
  text-align: center;
  color: ${props => (props.isSuccess ? "green" : "grey")};
  background-image: ${props => props.isSuccess ? COLORS.secondary : COLORS.primary};
  padding: 12px;
  border-radius: 16px;
  box-shadow: inset 2px 2px 8px hsl(0deg 0% 0% / 0.33);
  overflow: hidden;
  transition: 0.6s;
  &::after {
    transition: 0.6s;
    content: ${props => (props.isSuccess ? "successfully" : "")};
  }
`;
const Box = styled.div`
  opacity: 0.9;
  transition: 0.6s;
  background: white;
  text-align: center;
  font-size: 5rem;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  border-radius: calc(16px - 8px);
  box-shadow: 2px 2px 8px hsl(0deg 0% 0% / 0.33);
  vertical-align: middle;
  height: 175px;
  color: ${COLORS.black};
`;

const AnimationWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export default HeaderInformation;
