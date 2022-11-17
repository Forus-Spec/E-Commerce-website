// // This is our toast functionality which is amazing
import React from "react";
import Icon from "../../Icon";
import { COLORS } from "../Constants";
// This is our errorNotifier
export function errorConfig(toastId) {
  return {
    duration: 4000,
    icon: "⚠️",
    style: {
      fontWeigh: "bold",
      fontSize: "32px",
      textAlign: "center",
      width: "fit-content",
      width: "350px",
      height: "180px",
      borderRadius: "8px",
      transition: "all 0.5s ease-out",
      outline: "3px solid black",
      outlineOffset: "3px",
      background: "#333",
      color: "#fff"
    }
  };
}

export function successConfig() {
  return {
    duration: 6000,
    icon: "✔️",
    style: {
      textAlign: "center",
      fontWeigh: "bold",
      fontSize: "32px",
      width: "fit-content",
      padding: "16px 32px",
      width: "350px",
      height: "180px",
      borderRadius: "8px",
      backgroundImage: "linear-gradient(20deg, #233329 0%, #63D471 100%)",
      color: "#fff"
    }
  };
}

export function favoritesToast(emoji) {
  return {
    duration: 5000,
    icon: `${emoji}`,
    style: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "22px",
      width: "max-content",
      padding: "12px 22px",
      width: "950px",
      height: "80px",
      borderRadius: "50px",
      background: `${COLORS.primary}`,
      border: `3px solid ${COLORS.orange}`,
      color: "#fff"
    }
  };
}
