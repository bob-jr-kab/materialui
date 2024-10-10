import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { Box, useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import MovieList from "../Contents/MovieList.jsx";
import Counter from "../Contents/Counter.jsx";
import ToDoList from "../Contents/ToDoList.jsx";

const Layout = () => {
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box>
          <Navbar />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={isSmallScreen ? 0 : 21}
            sx={{ width: "100%" }}
          >
            <Box>
              <Sidebar />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Routes>
                <Route path="/" element={<MovieList />} />
                <Route
                  path="/counter"
                  element={
                    <Box sx={{ width: isSmallScreen ? "92%" : "97%" }}>
                      <Counter />
                    </Box>
                  }
                />
                <Route
                  path="/todo"
                  element={
                    <Box sx={{ width: isSmallScreen ? "92%" : "97%" }}>
                      <ToDoList />
                    </Box>
                  }
                />
              </Routes>
            </Box>
          </Stack>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default Layout;
