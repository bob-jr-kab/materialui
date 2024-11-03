import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import {
  styled,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import MovieList from "../Contents/MovieList.jsx";
import Counter from "../Contents/Counter.jsx";
import ToDoList from "../Contents/ToDoList.jsx";
import Calculator from "../Contents/Calculator.jsx";
import HomePage from "../pages/HomePage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

const StyledHomeContainer = styled("div")(
  ({ isSmallScreen, isTabletScreen }) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    paddingTop: isTabletScreen ? "5%" : "10%",
    paddingLeft: isSmallScreen ? "0px" : isTabletScreen ? "0%" : "5%",
    backgroundImage:
      "linear-gradient(135deg, hsla(144, 4%, 77%, 1) 10%, hsla(150, 16%, 93%, 1) 50%, hsla(144, 4%, 77%, 1) 100%)",
  })
);

const StyledNotFoundContainer = styled("div")(
  ({ theme, isSmallScreen, isTabletScreen }) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    paddingTop: "10%",
    paddingLeft: isSmallScreen ? "0px" : isTabletScreen ? "5%" : "20%",
    backgroundImage:
      "linear-gradient(135deg, hsla(144, 4%, 77%, 1) 10%, hsla(150, 16%, 93%, 1) 50%, hsla(144, 4%, 77%, 1) 100%)",
  })
);

const Layout = () => {
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Navbar />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={isSmallScreen ? 0 : isTabletScreen ? 15 : 10}
            sx={{ width: "100%" }}
          >
            <div style={{ width: "19%" }}>
              <Sidebar />
            </div>
            <div style={{ width: "100%" }}>
              <Routes>
                <Route path="/calculator" element={<Calculator />} />
                <Route
                  path="/counter"
                  element={
                    <div style={{ width: isSmallScreen ? "92%" : "97%" }}>
                      <Counter />
                    </div>
                  }
                />
                <Route
                  path="/todo"
                  element={
                    <div style={{ width: "100%" }}>
                      <ToDoList />
                    </div>
                  }
                />

                <Route
                  path="/"
                  element={
                    <StyledHomeContainer
                      isSmallScreen={isSmallScreen}
                      isTabletScreen={isTabletScreen}
                    >
                      <HomePage />
                    </StyledHomeContainer>
                  }
                />

                <Route
                  path="/movies"
                  element={
                    <div style={{ width: isSmallScreen ? "100%" : "100%" }}>
                      <MovieList />
                    </div>
                  }
                />
                <Route
                  path="*"
                  element={
                    <StyledNotFoundContainer
                      isSmallScreen={isSmallScreen}
                      isTabletScreen={isTabletScreen}
                    >
                      <NotFoundPage />
                    </StyledNotFoundContainer>
                  }
                />
              </Routes>
            </div>
          </Stack>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default Layout;
