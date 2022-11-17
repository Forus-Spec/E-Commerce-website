import React from "react";
import styled, { keyframes } from "styled-components/macro";
import Label from "../Label";
import { COLORS, CORNERS } from "../Constants";
import Icon from "../../Icon";

const STYLES = {
   fit: {
    fontSize: 18,
    iconSize: 12,
    borderThickness: 2,
    height: 26,
    width: 88,
    iconPlacementLeft: 290,
    iconPlacementTop: 18
  },
  small: {
    fontSize: 18,
    iconSize: 12,
    borderThickness: 2,
    height: 38,
    width: 380,
    iconPlacementLeft: 290,
    iconPlacementTop: 18
  },
  medium: {
    fontSize: 20,
    iconSize: 16,
    borderThickness: 2,
    height: 42,
    width: 716,
    iconPlacementLeft: 490,
    iconPlacementTop: 25
  },
  large: {
    fontSize: 23,
    height: 42,
    width: 1232,
    iconSize: 24,
    borderThickness: 3,
    iconPlacementLeft: 740,
    iconPlacementTop: 48
  }
};
const InputField = ({
  label = "",
  size = "medium",
  placeHolder = "",
  isSuccess = false,
  successMessage = null,
  isError = false,
  onChange = null,
  error = null,
  isLoading = false,
  errorMessage = null,
  name = "",
  type = "",
  id = "",
  htmlFor = "",
  register = {},
  ...delegated
}) => {
  const styles = STYLES[size];

  if (!styles) throw new Error(`size is invalid ${size}`);
  let iconContent;
  if (isSuccess) {
    iconContent = (
      <Icon name="check" size={size === "large" ? 32 : 28} color="green" />
    );
  } else if (isError) {
    iconContent = (
      <Icon name="xMark" size={size === "large" ? 32 : 28} color="red" />
    );
  }

  return (
    <Wrapper>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      <InputWrapper>
        <Input
          isSuccess={isSuccess}
          isError={isError}
          placeholder={placeHolder}
          onChange={onChange}
          name={name}
          type={type}
          id={id}
          {...register}
          {...delegated}
          style={{
            "--width": styles.width + "px",
            "--height": styles.height / 16 + "rem",
            "--border-thickness": styles.borderThickness + "px",
            "--font-size": styles.fontSize / 16 + "rem"
          }}
        />
        <IconWrapper>
          {!isLoading ? iconContent : <LoadingComponent />}
        </IconWrapper>
      </InputWrapper>
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {isSuccess && <SuccessMessage>{successMessage}</SuccessMessage>}
    </Wrapper>
  );
};

function LoadingComponent() {
  return (
    <>
      <Loading0></Loading0>
      <Loading1></Loading1>
      <Loading2></Loading2>
    </>
  );
}

const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 12px;
  padding: 1px;
  margin-right: 5px;
`;

const SuccessMessage = styled.div`
  opacity: 0.5;
  color: green;
  border-radius: ${CORNERS.small};
  margin-top: 8px;
  position: absolute;
  width: max-content;
  font-size: 22px;
  background-image: ${COLORS.primary};
  color: white;
  padding: 2px 6px;
`;

const ErrorMessage = styled.div`
  opacity: 0.9;
  border-radius: ${CORNERS.small};
  margin-top: 8px;
  position: absolute;
  width: max-content;
  font-size: 20px;
  background-color: ${COLORS.red};
  color: white;
  padding: 2px 8px;
`;

const Wrapper = styled.div`
  text-align: left;
  margin: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  gap: 20px;
  position: relative;
  color: ${COLORS.gray700};
  &:hover {
    color: ${COLORS.black};
  }
`;

const Input = styled.input`
  cursor: ${props => (props.disabled ? "not-allowed" : "")};
  padding: 0.5em 2em;
  width: var(--width);
  height: var(--height);
  font-size: var(--font-size);
  border-radius: 6px;
  padding-left: var(--height);
  outline: ${props =>
    props.isSuccess
      ? "1px solid green"
      : props.isError
      ? `1px solid ${COLORS.danger}`
      : `1px solid ${COLORS.transparentGray15}`};
  outline-offset: ${props =>
    props.isSuccess
      ? "1px"
      : props.isError
      ? `1px solid ${COLORS.danger}`
      : `1px solid ${COLORS.transparentGray15}`};
  transition: 0.2s;
  border:none;
  &:focus {
    box-shadow:  ${props =>
      props.isSuccess
        ? `0px 8px 12px -2px ${COLORS.green}`
        : props.isError
        ? `0px 8px 12px -2px ${COLORS.danger}`
        : `0px 8px 12px -2px ${COLORS.transparentGray15}`};
    transform: scale(1.02, 1.02);
    transition: all 0.4s -0.125s;
  }
  &:hover {
    /* box-shadow: 0px 8px 12px -2px ${COLORS.orange};
    transform: scale(1.01, 1.01);
    transition: all 0.4s -0.125s; */
  }

  &::placeholder {
    font-weight: 800;
    color: ${COLORS.gray500};
  }
`;

const bounce = keyframes`
  0%, 100% {
    opacity:1;
  }
  60% {
    opacity:.0;
  }
`;

const LoadingInput = styled.div`
  width: 10px;
  height: 10px;
  display: flex;
  float: left;
  flex-direction: row;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 10px;
  background: #fff;
  border-radius: 100%;
`;
const Loading0 = styled(LoadingInput)`
  animation: ${bounce} 1s infinite;
  animation-delay: 0.1s;
  background: ${COLORS.primary};
`;
const Loading1 = styled(LoadingInput)`
  animation: ${bounce} 1s infinite;
  animation-delay: 0.3s;
  background-image: ${COLORS.secondary};
`;
const Loading2 = styled(LoadingInput)`
  animation: ${bounce} 1s infinite;
  animation-delay: 0.5s;
  background: ${COLORS.primary};
`;

export default InputField;
