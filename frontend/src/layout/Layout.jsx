import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import {
  styled,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  Breadcrumbs,
  Box,
  Typography,
} from "@mui/material";
import MovieList from "../Contents/MovieList.jsx";
import ToDoList from "../Contents/ToDoList.jsx";
import Calculator from "../Contents/Calculator.jsx";
import HomePage from "../pages/HomePage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ExchangeRate from "../Contents/ExchangeRate.jsx";
import UnitConverter from "../Contents/ConvertUnits.jsx";

const StyledHomeContainer = styled("div")(
  ({ isSmallScreen, isTabletScreen }) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    paddingTop: isTabletScreen ? "5%" : "10%",
    paddingLeft: isSmallScreen ? "0px" : isTabletScreen ? "0%" : "15%",
  })
);

const StyledNotFoundContainer = styled("div")(
  ({ theme, isSmallScreen, isTabletScreen }) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })
);

const Layout = ({ children, name }) => {
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isNotFoundPage = location.pathname === "*";

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />

        {/* Render Sidebar and Content Stack only for non-HomePage and non-NotFoundPage */}
        {!isHomePage && !isNotFoundPage && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={isSmallScreen ? 0 : isTabletScreen ? 15 : 10}
            sx={{
              width: "100%",
              backgroundImage:
                "linear-gradient(135deg, hsla(144, 4%, 77%, 1) 10%, hsla(150, 16%, 93%, 1) 50%, hsla(144, 4%, 77%, 1) 100%)",
            }}
          >
            <div style={{ width: "19%" }}>
              <Sidebar />
            </div>
            <div style={{ width: "100%", display: "block" }}>
              <Box px={{ xs: 2, sm: 5, md: 5 }} mb={0} pt={2}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home
                  </Link>
                  <Typography color="textPrimary">{name}</Typography>{" "}
                </Breadcrumbs>
              </Box>
              <div>{children}</div>
            </div>
          </Stack>
        )}

        {/* Render HomePage directly */}
        {isHomePage && (
          <StyledHomeContainer
            isSmallScreen={isSmallScreen}
            isTabletScreen={isTabletScreen}
          >
            <HomePage />
          </StyledHomeContainer>
        )}

        {/* Render NotFoundPage directly */}
        {isNotFoundPage && (
          <StyledNotFoundContainer
            isSmallScreen={isSmallScreen}
            isTabletScreen={isTabletScreen}
          >
            <NotFoundPage />
          </StyledNotFoundContainer>
        )}
      </div>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main app routes */}
        <Route
          path="/"
          element={
            <Layout name="Home">
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/calculator"
          element={
            <Layout name="calculator">
              <Calculator />
            </Layout>
          }
        />
        <Route
          path="/todo"
          element={
            <Layout name="todo">
              <ToDoList />
            </Layout>
          }
        />
        <Route
          path="/exchange"
          element={
            <Layout name="exchange">
              <ExchangeRate />
            </Layout>
          }
        />
        <Route
          path="/convert"
          element={
            <Layout name="converter">
              <UnitConverter />
            </Layout>
          }
        />
        <Route
          path="/movies"
          element={
            <Layout name="movies">
              <MovieList />
            </Layout>
          }
        />

        {/* Catch-all for NotFoundPage */}
        <Route
          path="*"
          element={
            <StyledNotFoundContainer>
              <NotFoundPage />
            </StyledNotFoundContainer>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
