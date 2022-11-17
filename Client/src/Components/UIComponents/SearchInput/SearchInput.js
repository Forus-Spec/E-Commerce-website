import React from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import Icon from "../../Icon";
import VisuallyHidden from "../VisuallyHidden";

const STYLES = {
  small: {
    fontSize: 12,
    iconSize: 14,
    borderThickness: 1,
    height: 26
  },
  large: {
    fontSize: 18,
    iconSize: 24,
    borderThickness: 2,
    height: 36
  }
};
// https://youtu.be/VUR0I5mqq7I
const SearchInput = ({
  id = "",
  label = "search",
  width = 260,
  size = "small",
  onChange,
  value,
  isLabeled = false,
  placeHolder = ""
}) => {
  const styles = STYLES[size];
  if (!styles) throw new Error(`size is invalid ${size} `);
  return (
    <Wrapper>
      {isLabeled && <VisuallyHidden>{label}</VisuallyHidden>}
      <IconWrapper style={{ "--size": styles.iconSize + "px" }}>
        <Icon size={28} strokeWidth={3} name="search" color="orange" />
      </IconWrapper>
      <TextInput
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        id={id}
        style={{
          "--width": width + "px",
          "--height": styles.height / 16 + "rem",
          "--border-thickness": styles.borderThickness + "px",
          "--font-size": styles.fontSize / 16 + "rem"
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: baseline;
  position: relative;
  width: 100%;
  top: 10px;
  color: ${COLORS.gray700};
  &:hover {
    color: ${COLORS.black};
  }
`;

const IconWrapper = styled.div`
  /* position: absolute;
  top: 10px;
  left: 330px; */
  position: relative;
  bottom: 5px;
  margin-right: 10px;
  width: fit-content;
  height: var(--size);
`;

const TextInput = styled.input`
  width: var(--width);
  height: var(--height);
  font-size: var(--font-size);
  color: inherit;
  border: none;
  font-weight: 800;
  margin-left: 12px;
  width: 100%;
  &:focus {
    outline: none !important;
  }

  &:placeholder {
    font-weight: 400;
    color: ${COLORS.gray500};
  }
`;

export default SearchInput;
