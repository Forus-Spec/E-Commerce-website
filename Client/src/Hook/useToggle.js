import React from "react";
import { useCallback, useState } from "react";

export function useToggle(defaultValue = false) {
  const [bool, setBool] = React.useState(defaultValue);

  const toggle   = useCallback(() => setBool(s => !s), []);
  const setTrue  = useCallback(() => setBool(true), [])
  const setFalse = useCallback(() => setBool(false), [])

  return { bool, toggle, setTrue, setFalse }
}
