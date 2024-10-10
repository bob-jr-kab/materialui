import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { Box, useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import MovieList from "../Contents/MovieList.jsx";
import Counter from "../Contents/Counter.jsx";
import ToDoList from "../Contents/ToDoList.jsx";

const Layout = () => {
  // Create a theme object for ThemeProvider
  const theme = createTheme();

  // Check if screen size is small
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Router>
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
              <Sidebar />
            </Box>
            <Box
              sx={{
                width: isSmallScreen ? "100%" : "100%", // Full width for content on small screens
              }}
            >
              <Routes>
                <Route path="/" element={<MovieList />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/todo" element={<ToDoList />} />
                {/* Add more routes as needed */}
              </Routes>
            </Box>
          </Stack>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default Layout;
