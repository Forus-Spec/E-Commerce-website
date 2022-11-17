import styled from "styled-components";
import Dialog from "@reach/dialog";
import React from "react";
import Button from "../Button";
import { COLORS, CORNERS } from "../Constants";
import { NavLink } from "react-router-dom";
import Icon from "../../Icon";

const Modal = ({ isOpen, setClose, firstName, logout, stay }) => {
  return (
    <StyledDialog aria-label="Login form" isOpen={isOpen} onDismiss={setClose}>
      <Message>Hey {firstName} are you away from the keyboard</Message>
      <br />
      <Button size="long" variant="outline" onClick={stay}>
        I'm still here !
      </Button>
      <br />
      <Button variant="outline" size="long" onClick={logout}>
        <UserLink to="/products">
          Logout
          <Icon color="orange" size={22} name="log-out" />
        </UserLink>
      </Button>
    </StyledDialog>
  );
};

const UserLink = styled(NavLink)`
  &.active {
    transition: 0.4s;
    color: #f26522;
    transform: translate(0px, -2px);
  }
  display: flex;
  flex-direction: row;
  transition-delay: 0s;
  transition-duration: 0.4s;
  color: ${COLORS.black};
`;
const Message = styled.div`
  padding: 4px 8px;
  color: ${COLORS.black};
  box-shadow: 0px 2px 2px hsl(0deg, 0%, 0.25%);
  border: none;
  border-radius: ${CORNERS.normal};
  outline: 1px solid ${COLORS.orange};
  font-size: 24px;
  font-weight: bold;
`;
const StyledDialog = styled(Dialog)`
  margin-top: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 20px;
  border-radius: 8px;
  width: max-content;
`;

export default Modal;
