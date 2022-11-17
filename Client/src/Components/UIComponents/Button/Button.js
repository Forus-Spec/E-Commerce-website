import React from "react";
import styled, { keyframes } from "styled-components";
import { useSpinDelay } from "spin-delay";
import { COLORS } from "../Constants";
import Loading from "./Loading";
import Error from "./Error";
import Success from "./Success";

const SIZES = {
  fit: {
    "--width": "fit-content",
    "--height": 52 + "px",
    "--fontSize": 0.9 + "rem",
    "--padding": "1px 1px"
  },
  long: {
    "--width": 100 + "%",
    "--height": 52 + "px",
    "--fontSize": 0.9 + "rem",
    "--padding": "1px 1px"
  },
  small: {
    "--width": 202 + "px",
    "--height": 42 + "px",
    "--fontSize": 1 + "rem",
    "--padding": "3px 2px"
  },
  extraSmall: {
    "--width": 102 + "px",
    "--height": 42 + "px",
    "--fontSize": 1 + "rem",
    "--padding": "3px 2px"
  },
  normal: {
    "--width": 162 + "px",
    "--height": 50 + "px",
    "--fontSize": 1.095 + "rem",
    "--padding": "1px 1px"
  },
  medium: {
    "--width": 150 + "px",
    "--height": 58 + "px",
    "--fontSize": 1.1 + "rem",
    "--padding": "1px 1px"
  },
  large: {
    "--width": 180 + "px",
    "--height": 62 + "px",
    "--fontSize": 1.185 + "rem",
    "--fontSize": 21 / 16 + "rem",
    "--padding": "6px 4px"
  },
  extra: {
    "--width": 747 + "px",
    "--height": 72 + "px",
    "--fontSize": 2.5 + "rem",
    "--fontSize": 21 / 16 + "rem",
    "--padding": "6px 4px"
  }
};

// this is our ButtonSize functionality which is amazing and awesome
const Button = ({
  variant = "fill",
  size = "normal",
  isLoading = false,
  isSuccess = false,
  isError = false,
  children,
  ...props
}) => {
  const styles = SIZES[size];

  const loadingDelay = useSpinDelay(isLoading, { delay: 50, minDuration: 90 });

  let Component;

  if (variant === "fill" && isError === true) {
    Component = ErrorButton;
  } else if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  } else if (variant === "circular") {
    Component = CircularButton;
  } else {
    throw new Error(`Unrecognized Button variant: ${variant}`);
  }

  return (
    // This is the greatest styles functionality ever which is amazing and awesome
    <Component
        style={styles}
        isSuccess={isSuccess} {...props}>
      {loadingDelay ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : isSuccess ? (
        <Success />
      ) : (
        children
      )}
    </Component>
  );
};

const ButtonBase = styled.button`
  margin: 5px;
  font-weight: 600;
  line-height: 1;
  color: ${COLORS.white};
  height: var(--height);
  padding: var(--padding);
  border-radius: 6px;
  font-size: var(--fontSize);
  border: none;
  box-shadow: 0 4px 6px 0 rgba(195, 95, 55, 0.435);
  transition: all 0.4s ease;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const FillButton = styled(ButtonBase)`
  background-image: ${props =>
    props.isSuccess ? COLORS.secondary : COLORS.primary};
  color: ${COLORS.white};
  line-height: var(--lineHeight);
  width: var(--width);
  &:hover {
    transition: 0.1s;
    outline-color: ${COLORS.orange};
    outline-width: 1px;
    outline-offset: 6px;
  }
  &:active {
    box-shadow: 0px 12px 22px -2px ${COLORS.orange};
    transform: scale(1, 1);
  }
`;

const ErrorButton = styled(ButtonBase)`
  background-image: ${COLORS.gray};
  line-height: var(--lineHeight);
  width: var(--width);
  &:hover {
    outline-color: ${COLORS.transparentGray15};
    outline-width: 1px;
    outline-offset: 1px;
    outline-style: inset;
  }
`;
const OutlineButton = styled(ButtonBase)`
  background-color: ${COLORS.white};
  color: ${COLORS.orange};
  width: var(--width);
  letter-spacing: 1px;
  transition: 0.1s;
  &:hover {
    outline-color: ${COLORS.transparentOrange};
    outline-width: 3px;
    outline-offset: 2px;
    outline-style: outset;
  }
  &:active {
    outline-color: ${COLORS.transparentOrange};
    outline-width: 5px;
    outline-offset: 1px;
    outline-style: inset;
    background: radial-gradient(
      circle at 10% 20%,
      rgb(242, 235, 243) 0%,
      rgb(234, 241, 249) 90.1%
    );
    box-shadow: inset 3px 3px 5px #cbcbcb, inset -3px -3px 5px #ffffff;
    font-weight: bold;
    color: ${COLORS.orange};
  }
`;

const CircularButton = styled(ButtonBase)`
  background-color: ${COLORS.white};
  color: ${COLORS.orange};
  border-radius: 50%;
  padding: 20px;
  width: var(--width);
  letter-spacing: 1px;
  transition: 0.1s;
  &:hover {
    outline-color: ${COLORS.transparentOrange};
    outline-width: 3px;
    outline-offset: 2px;
    outline-style: outset;
  }
  &:active {
    outline-color: ${COLORS.transparentOrange};
    outline-width: 5px;
    outline-offset: 1px;
    outline-style: inset;
    background: radial-gradient(
      circle at 10% 20%,
      rgb(242, 235, 243) 0%,
      rgb(234, 241, 249) 90.1%
    );
    box-shadow: inset 3px 3px 5px #cbcbcb, inset -3px -3px 5px #ffffff;
    font-weight: bold;
    color: ${COLORS.orange};
  }
`;

export default Button;
