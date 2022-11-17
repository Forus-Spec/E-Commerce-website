import React from "react";
import { COLORS, CORNERS, WEIGHTS } from "../UIComponents/Constants";
import Logo from "../Logo";
import styled, { keyframes } from "styled-components";
import { Routes,
         Route,
         NavLink,
         useLocation,
         Navigate } from "react-router-dom";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import Favorites from "../../Pages/Favorites/Favorites";
import UserProfile from "../../Pages/UserProfile/UserProfile";
import FourOFour from "../../Pages/FourOFour/FourOFour";
import ExclamationMark from "./ExclamationMark";
import Icon from "../Icon";
import Button from "../UIComponents/Button";
import SuperHeader from "../SuperHeader";
import HeaderInformation from "./HeaderInformation";
import ProductPage from "../../Pages/ProductPage/ProductPage";
import { AuthContext } from "../../Context/AuthContext";
import RegisterPage from "../../Pages/Auth/RegisterPage";
import ProductDetail from "../../Pages/ProductDetail/ProductDetail";
import Usercart from "../../Pages/Usercart/Usercart";
import Profile from "../../Pages/UserProfile/Profile/Profile";
import Cart from "../../Pages/UserProfile/Cart/Cart";
import Security from "../../Pages/UserProfile/Security/Security";
import History from "../../Pages/UserProfile/History/History";
import PleaseSelect from "../../Pages/UserProfile/PleaseSelect/PleaseSelect";
import Filtering from "../../Pages/UserProfile/Crud/Filtering";
import CreateProduct from "../../Pages/UserProfile/Crud/CreateProduct";

  const AuthenticateRoute = ({ children, ...rest }) => {
    const auth = React.useContext(AuthContext);
    if(!auth.isAuthenticated()) return <Navigate to="/products"  replace/>
    return children;
  }
const AuthenticatedAdmin = ({children,...rest})=>{
    const auth  = React.useContext(AuthContext);
    if(!auth.isAdmin()) return <Navigate to="/products" replace/>
    return children;
  }

const Header = ({ setOpen }) => {
  const { pathname } = useLocation();
  const auth = React.useContext(AuthContext);
  // this is our awesome special power functionality which is amazing and awesome
  console.log("Special power",auth && auth.authState)

  const [position, setPosition] = React.useState(window.pageYOffset);
  const [visible, setVisible]   = React.useState(true);
  const [successHeader, setSuccessHeader] = React.useState(false);

  function pathNameUpdate(string) {
    const  letter = string.slice(1).replace(/%20/g, " ");
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  }
  React.useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

//   const AuthenticateRoute = ({ children, ...rest }) => {
//     const auth = React.useContext(AuthContext);
//     return (
//       <Route {...rest}>
//         {!auth.isAuthenticated() ? <Redirect to="/login"/>:children}
//       </Route>
//     )
//   }

// // This is our
//   const AdminRoute = ({ children, ...rest }) => {
//     const auth = React.useContext(AuthContext);
//     return (
//       <Route {...rest} render={() => auth.isAuthenticated() && auth.isAdmin() ? (
//         <>{children}</>
//       ) : (
//         <UserLink to="/" />
//       )
//       }>
//       </Route>
//     )
//   }

  return (
    <>
      <SuperHeader />
      <MainHeader visible={visible}>
        <Nav>
          <LogoSide>
            <Logo />
          </LogoSide>
          <NavLinks>
            <StyledLink to="/products">Home</StyledLink>
            <StyledLink to="/about%20us">About Us</StyledLink>
            <StyledLink to="/contact%20us">Contact Us</StyledLink>
            <StyledLink to="/limited%20edition">
              <FloatingAnimation>
                Limited Edition
                <AnimateWrapper>
                  <ExclamationMark size={16} />
                </AnimateWrapper>
              </FloatingAnimation>
            </StyledLink>
          </NavLinks>
          {!auth.authState.token ? (
            <GuestSide>
              <StyledLink to="/register">
                <Button variant="outline" size="medium">
                  Register
                  <Icon name="user" size={16} strokeWidth={3} />
                </Button>
              </StyledLink>
              <Button onClick={setOpen} size="medium">
                Login
                <Icon name="log-in" size={16} strokeWidth={3} />
              </Button>
            </GuestSide>
          ) : (
            undefined
          )}
          {auth.authState.token ? (
            <UserSide>
              <UserLink to="/favorites">
                <Icon
                  hover={true}
                  active={pathname === "/favorites"}
                  size={28}
                  name="heart"
                />
                Favorites
              </UserLink>
              <UserLink to="/user%20cart">
                <Icon size={28} name="shopping-cart" />
                Cart
              </UserLink>
              <UserLink to="/userprofile">
                <Icon size={28} name="user" />
                {auth.authState.userInfo.firstName}
              </UserLink>
              <Button variant="outline" onClick={() => auth.logout()}>
                <UserLink to="/logout">
                  <Icon color="orange" size={22} name="log-out" />
                </UserLink>
              </Button>
            </UserSide>
          ) : (
            undefined
          )}
        </Nav>
      </MainHeader>
      <HeaderInformation
        pathName={pathNameUpdate(pathname)}
        successHeader={successHeader}
        setSuccessHeader={setSuccessHeader}
      />
      <Routes>
        <Route path="/products" element={<ProductPage />} />
        <Route
          path="/products/product-detail/:productId"
          element={<ProductDetail />}
        />
        <Route
          path="/register"
          element={<RegisterPage setSuccessHeader={setSuccessHeader} />}
        />
        <Route path="/favorites" element={<AuthenticateRoute><Favorites /></AuthenticateRoute>} />
        <Route path="/about%20us" element={<AboutUs />} />
        <Route path="/contact%20us" element={<ContactUs />} />
        <Route path="/user%20cart" element={<Usercart />} />
        <Route path="/userprofile" element={<AuthenticateRoute><UserProfile /></AuthenticateRoute>}>
          <Route index element={<PleaseSelect />} />
          <Route path="/userprofile/security" element ={<Security />} />
          <Route path="/userprofile/admin"    element ={<AuthenticatedAdmin><Filtering /></AuthenticatedAdmin>} />
          <Route path="/userprofile/profile"  element ={<Profile />} />
          <Route path="/userprofile/cart"     element ={<Cart />} />
          <Route path="/userprofile/product"  element ={<AuthenticatedAdmin><CreateProduct/></AuthenticatedAdmin>}/>
          <Route path="/userprofile/history"  element ={<History />} />
        </Route>
        <Route path="/limited%20edition" element={<Favorites />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </>
  );
};

const GuestSide = styled.nav`
  display: flex;
  gap: 32px;
`;

// Re-Study this Tricky Section  🟢
const RouteTitle = styled.h4`
  margin: auto;
  color: white;
  letter-spacing: 1px;
  font-size: 6rem;
  width: max-content;
`;

const MainHeader = styled.div`
  padding: 26px 24px;
  position: sticky;
  top: ${props => (props.visible ? "0" : "-120px")};
  transition: top 0.3s ease-out;
  z-index: 10;
  border-bottom-right-radius: ${CORNERS.large};
  border-bottom-left-radius: ${CORNERS.large};
  border: none;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.2);
  @supports (backdrop-filter: blur(12px)) {
    background: hsl(0deg 0% 100% / 0.5);
    backdrop-filter: blur(12px);
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  gap: 60px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  flex: 1;
`;

const UserSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  gap: 32px;
`;
const LogoSide = styled.div``;
const StyledLink = styled(NavLink)`
  &.active {
    color: ${COLORS.orange};
    transform: translate(0px, -4px);
    text-decoration: underline;
  }
  text-decoration: none;
  transition-duration: 0.4s;
  font-size: 1.325rem;
  color: ${COLORS.black};
`;

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

const floatings = keyframes`
    from { transform: translate(0,  0px); }
    65%  { transform: translate(0, 15px); }
    to   { transform: translate(0, -0px); }
`;

const FloatingAnimation = styled.div`
  position: relative;
  font-weight: bold;
`;

const Wave = keyframes`
from {
  transform:rotate(-8deg);
}
to {
  transform:rotate(8deg);
}
`;
const AnimateWrapper = styled.div`
  display: inline-block;
  position: absolute;
  top: -12px;
  right: -24px;
  animation: ${Wave} 890ms infinite alternate ease-in-out;
`;

export default Header;
