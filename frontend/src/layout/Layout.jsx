import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { Box, useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import MovieList from "../Contents/MovieList.jsx";
import Counter from "../Contents/Counter.jsx";
import ToDoList from "../Contents/ToDoList.jsx";

const Layout = () => {
  const [selectedComponent, setSelectedComponent] = useState("Movies");

  // Create a theme object for ThemeProvider
  const theme = createTheme();

  // Check if screen size is small
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Function to handle component selection from Sidebar
  const onSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  // Function to render the selected component
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Movies":
        return <MovieList />;
      case "Counter":
        return <Counter />;
      case "Settings":
        return <ToDoList />;
      default:
        return <MovieList />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar />
        <Stack
          direction={{ xs: "column", sm: "row" }} // Stack column for small screens, row for larger
          spacing={isSmallScreen ? 0 : 20} // No spacing on small screens
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              width: isSmallScreen ? "100%" : "auto", // Full width on small screens
            }}
          >
            <Sidebar onSelectComponent={onSelectComponent} />
          </Box>
          <Box
            sx={{
              width: isSmallScreen ? "100%" : "auto", // Full width for content on small screens
            }}
          >
            {renderComponent()}
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
