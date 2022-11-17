import React from "react";
import styled from "styled-components/macro";
import Label from "../Label";
import { COLORS } from "../Constants";
import Icon from "../../Icon";

const STYLES = {
  extrasmall: {
    fontSize: 12,
    iconSize: 14,
    borderThickness: 2,
    height: 28,
    width: 401,
    iconPlacementLeft: 490,
    iconPlacementTop: 25
  },
  medium: {
    fontSize: 12,
    iconSize: 14,
    borderThickness: 2,
    height: 32,
    width: 501,
    iconPlacementLeft: 490,
    iconPlacementTop: 25
  },
  large: {
    fontSize: 18,
    height: 42,
    width: 1232,
    iconSize: 24,
    borderThickness: 2,
    iconPlacementLeft: 740,
    iconPlacementTop: 48
  }
};

const FieldShell = ({
  children,
  label = "",
  size = "medium",
  isSuccess = false,
  isError = false,
  onChange = null,
  name = "",
  dataTip = "",
  ...delegated
}) => {
  const styles = STYLES[size];

  if (!styles) throw new Error(`size is invalid ${size}`);

  let iconContent;

  if (isSuccess) {
    iconContent = <Icon name="check" size={32} color="green" />;
  } else if (isError) {
    iconContent = <Icon name="xMark" size={32} color="red" />;
  }
  return (
    <Wrapper isError={isError} isSuccess={isSuccess}>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        {children}
        <IconWrapper>{iconContent}</IconWrapper>
      </InputWrapper>
    </Wrapper>
  );
};

const IconWrapper = styled.div`
  position: absolute;
  right: 42px;
  top: 10px;
`;

const Wrapper = styled.div`
  text-align: left;
  padding: 7px;
  border-bottom: ${props => props.isError ? `4px solid ${COLORS.red}` : props.isSuccess ? `4px solid ${COLORS.green}` : ""};
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: baseline;
  gap: 22px;
  color: ${COLORS.gray700};
  &:hover {
    color: ${COLORS.black};
  }
`;

export default FieldShell;
