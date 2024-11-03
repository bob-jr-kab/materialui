import React, { createContext, useContext, useState, useEffect } from "react";
import { useMediaQuery, createTheme } from "@mui/material";

// Create ScreenSizeContext
const ScreenSizeContext = createContext();

export const ScreenSizeProvider = ({ children }) => {
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [screenSize, setScreenSize] = useState({
    isSmallScreen,
    isTabletScreen,
    isLargeScreen,
  });

  useEffect(() => {
    setScreenSize({
      isSmallScreen,
      isTabletScreen,
      isLargeScreen,
    });
  }, [isSmallScreen, isTabletScreen, isLargeScreen]);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

// Custom hook to use the ScreenSizeContext
export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};
