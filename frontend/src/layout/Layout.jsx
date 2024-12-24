import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
    paddingLeft: isSmallScreen ? "0px" : isTabletScreen ? "0%" : "5%",
  })
);

const StyledNotFoundContainer = styled("div")(
  ({ theme, isSmallScreen, isTabletScreen }) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(135deg, hsla(144, 4%, 77%, 1) 10%, hsla(150, 16%, 93%, 1) 50%, hsla(144, 4%, 77%, 1) 100%)",
  })
);

const Layout = ({ children }) => {
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const location = useLocation();

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
            <div style={{ width: "100%" }}>{children}</div>
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
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/calculator"
          element={
            <Layout>
              <Calculator />
            </Layout>
          }
        />
        <Route
          path="/todo"
          element={
            <Layout>
              <ToDoList />
            </Layout>
          }
        />
        <Route
          path="/exchange"
          element={
            <Layout>
              <ExchangeRate />
            </Layout>
          }
        />
        <Route
          path="/convert"
          element={
            <Layout>
              <UnitConverter />
            </Layout>
          }
        />
        <Route
          path="/movies"
          element={
            <Layout>
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
