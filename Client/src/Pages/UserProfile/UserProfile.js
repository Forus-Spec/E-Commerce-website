import React from "react";
import UserSidebar from "./UserSidebar";
import UserInfo from "./Wrapper";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const UserProfile = () => {
  return (
    <Wrapper>
      <UserSidebar></UserSidebar>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 1px;
`;

export default UserProfile;
