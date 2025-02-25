"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/auth/store"; // Ensure this path is correct

// Use type instead of interface for typing the props
type StoreProviderProps = {
  children: ReactNode; // Typing the children prop
};

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
