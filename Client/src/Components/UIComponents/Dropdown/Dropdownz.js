import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../../Icon";
import Label from "../Label";
import { COLORS } from "../Constants";
import onClickOutside from "react-onclickoutside";
import Loading from "../Button/Loading";
import { LoadingAnimation } from "../Spinners/LoadingAnimation";

const Dropdown = ({ label, options, setData, disabled ,isLoading=false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggling = () => setIsOpen(isOpen => !isOpen);

  // this is our dropdown.handleClicked functionality which is amazing
  Dropdown.handleClickOutside = () => setIsOpen(false);

  const onOptionClicked = value => {
    setSelectedOption(value.name);
    setData(value.id);
    setIsOpen(false);
  };


  return (
    <>
      <Wrapper disabled={disabled}>
        <Label>{label}</Label>
        <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            {selectedOption || `${isLoading ? `Loading...`:`Please select your ${label}`}`}
            <Icon
              name="chevron-down"
              size={32}
              style={{
                position: "absolute",
                right: "10px",
                top: "58px"
              }}
            />
          </DropDownHeader>
          {isOpen &&
            <DropDownListContainer>
           {!isLoading ? (
              <DropDownList>
                {options.map(option => (
                  <ListItem
                    onClick={()=> onOptionClicked(option)}
                    key={Math.random()}>{option.name}
                  </ListItem>
                ))}
              </DropDownList>):
              (<LoadingAnimation/>)}
            </DropDownListContainer>
           }
        </DropDownContainer>
      </Wrapper>
    </>
  );
};

const onClickOutSideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside
};

const Wrapper = styled.div`
  width: 98%;
  margin: 8px;
  text-align: left;
  position: relative;
  z-index: 1.5;
  pointer-events: ${props => (props.disabled ? "none" : "")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

const DropDownContainer = styled.div`
  height: 55px;
  border-radius: 8px;
  border: 2px solid ${COLORS.white};
  background-color: ${COLORS.white};
`;

const DropDownHeader = styled.div`
  padding-left: 10px;
  vertical-align: middle;
  line-height: 52px;
  font-size: 1.4rem;
  color: ${COLORS.black};
  cursor: pointer;
`;

const DropDownListContainer = styled.div`
  margin-top: 20px;
  position: absolute;
  z-index: 1;
  width: 100%;
`;

const DropDownList = styled.ul`
  background: #ffffff;
  border-radius: 8px;
  color: black;
  font-size: 1.3rem;
  cursor: pointer;
`;

const ListItem = styled.li`
  list-style: none;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  &:hover {
    background-image: ${COLORS.primary};
  }
  margin-bottom: 0.8em;
`;

export default onClickOutside(Dropdown, onClickOutSideConfig);
