import { React, useState } from "react";
import Stack from "@mui/material/Stack";
import Sidebar from "./Sidebar.js";
import Navbar from "./Navbar.js";
import { Box } from "@mui/material";
import Content from "./Content.js";
import MovieList from "../pages/MovieList.js";
import Counter from "../pages/Counter.js";
import ToDoList from "../pages/ToDoList.js";

const Layout = () => {
  const [selectedComponent, setSelectedComponent] = useState("Movies");

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
    <Box>
      <Navbar />
      <Stack direction="row" spacing={20}>
        <Sidebar onSelectComponent={onSelectComponent} />
        <Content />
      </Stack>
      {renderComponent()}
    </Box>
  );
};

export default Layout;
