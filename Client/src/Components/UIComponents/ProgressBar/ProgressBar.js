/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import VisuallyHidden from "../VisuallyHidden";

const STYLES = {
  small: {
    height: 8,
    padding: 0,
    radius: 4
  },
  medium: {
    height: 12,
    padding: 0,
    radius: 4
  },
  large: {
    height: 16,
    padding: 4,
    radius: 8
  }
};
const ProgressBar = ({ value, size = "large" }) => {
  const styles = STYLES[size];
  if (!styles) {
    throw new Error(`Unknown size passed to ProgressBar: ${size}`);
  }
  return (
    <Wrapper>
      <span
        style={{
          fontWeight: "bold",
          fontSize: "28px",
          color: "grey"
        }}
      >
        {value}%
      </span>
      <ProgressWrapper
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{
          "--padding": styles.padding + "px",
          "--radius": styles.radius + "px"
        }}
      >
        <BarWrapper>
          <Bar
            style={{
              "--width": value + "%",
              "--height": styles.height + "px"
            }}
          />
        </BarWrapper>
      </ProgressWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* position:absolute; */
  text-align: center;
`;

const ProgressWrapper = styled.div`
  background-color: ${COLORS.transparentGray15};
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  border-radius: var(--radius);
  padding: var(--padding);
`;

const BarWrapper = styled.div`
  border-radius: 4px;
  /* Trim off corners when progress bar is near-full. */
  overflow: hidden;
`;

const Bar = styled.div`
  width: var(--width);
  height: var(--height);
  background-color: ${COLORS.orange};
  border-radius: 4px 0 0 4px;
`;

export default ProgressBar;
