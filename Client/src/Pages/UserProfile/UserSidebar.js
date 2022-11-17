import React from "react";
import styled from "styled-components";
import Icon from "../../Components/Icon";
import { COLORS } from "../../Components/UIComponents/Constants";
import { Player } from "@lottiefiles/react-lottie-player";
import LoginAnimation from "../../Components/Animations/LoginAnimation.json";
import Cart from "../../Components/Animations/Cart.json";
import History from "../../Components/Animations/History.json";
import Favorites from "../../Components/Animations/Favorites.json";
import Security from "../../Components/Animations/Security.json";
import AdminAnimation from "../../Components/Animations/Admina.json";
import ProductAnimation from "../../Components/Animations/ProductAnimation.json";
import { NavLink } from "react-router-dom";
// This is our UserSidebar functionality
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const UserSidebar = () => {
  // This is our animation functionality which is huge and awesome
  const [animation, setAnimation] = React.useState({ status: "" });
  let location = useLocation();
  const auth = React.useContext(AuthContext)

  const profileRef  = React.useRef(null);
  const securityRef = React.useRef(null);
  const cartRef     = React.useRef(null);
  const historyRef  = React.useRef(null);
  const adminRef    = React.useRef(null);
  const productRef  = React.useRef(null);

  React.useEffect(() => {
    if (location.pathname === "/userprofile/profile") {
      profileRef.current.play();
    }
    if (location.pathname === "/userprofile/security") {
      securityRef.current.play();
    }
    if (location.pathname === "/userprofile/cart") {
      cartRef.current.play();
    }
    if (location.pathname === "/userprofile/history") {
      historyRef.current.play();
    }
    if (location.pathname === "/userprofile/admin") {
      adminRef.current && adminRef.current.play();
    }
    if(location.pathname==="/userprofile/product"){
      productRef.current && productRef.current.play();
    }
  }, [location]);

  return (
    <Wrapper>
      <Title>User settings</Title>
      <StyledLink to="/userprofile/profile">
        <MenuTitle>Profile</MenuTitle>
        <Player
          src={LoginAnimation}
          speed={1.6}
          ref={profileRef}
          style={{ width: "70px" }}
        />
      </StyledLink>
      {auth.isAdmin() && (
      <StyledLink to="/userprofile/admin">
        <MenuTitle>Filtering</MenuTitle>
          <Player
            src={AdminAnimation}
            speed={1.6}
            ref={adminRef}
            style={{ width: "50px" }}
          />
        </StyledLink>
      )}
      {auth.isAdmin() && (
      <StyledLink to="/userprofile/product">
        <MenuTitle>Product</MenuTitle>
        <Player
          src={ProductAnimation}
          speed={1.6}
          ref={productRef}
          style={{ width: "74px" }}
        />
      </StyledLink>
      )}
      <StyledLink to="/userprofile/security">
        <MenuTitle>Security</MenuTitle>
        <Player
          src={Security}
          ref={securityRef}
          speed={1.6}
          style={{ width: "65px" }}
        />
      </StyledLink>
      <StyledLink to="/userprofile/cart">
        <MenuTitle>Cart</MenuTitle>
        <Player
          src={Cart}
          ref={cartRef}
          speed={1.6}
          style={{ width: "65px" }}
        />
      </StyledLink>
      <StyledLink to="/userprofile/history">
        <MenuTitle>History</MenuTitle>
        <Player
          src={History}
          ref={historyRef}
          speed={1.6}
          style={{ width: "65px" }}
        />
      </StyledLink>
    </Wrapper>
  );
};

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${COLORS.black};
`;

const MenuTitle = styled.h1`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${COLORS.white};
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.325rem;
  gap: 20px;
  font-weight: bold;
  padding: 6px 16px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 20px;
  border-radius: 12px;
  transition: all 0.4s ease;
  box-shadow: 4px 4px 10px #b3b3b3;
  background-image: ${COLORS.primary};
  cursor: pointer;
  &.active {
    transition: all 0.1s ease-in-out;
    outline: none;
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

const ImageWrapper = styled.div``;

const Image = styled.img``;

const Wrapper = styled.div`
  margin-top: 62px;
  text-align: center;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  background: linear-gradient(
    109.6deg,
    rgb(245, 239, 249) 30.1%,
    rgb(207, 211, 236) 100.2%
  );
  box-shadow: -10px -10px 20px -5px #f9fbfd, 10px 10px 20px #b8b6b6;
  height: 100%;
`;

export default UserSidebar;
