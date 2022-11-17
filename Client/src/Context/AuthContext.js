import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { queryCache } from "react-query";
import {
  errorConfig,
  successConfig
} from "../Components/UIComponents/Notification/notification";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  const expiresAt = localStorage.getItem("expiresAt");

  const [authState, setAuthState] = React.useState({
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    token,
    expiresAt
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    const result = { token, userInfo, expiresAt };
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);
    setAuthState({
      token,
      userInfo,
      expiresAt
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");
    setAuthState({});
    // queryCache.clear();
    navigate('/products');
    toast.error(`Good bye 👋`, successConfig());
  };

  // This is our isAuthenticated functionality
  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };
  // This is our isAdmin functionality which is amazing and awesome
  const isAdmin = () => {
    return authState.userInfo.role === "admin";
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
