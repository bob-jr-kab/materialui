import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Home,
  Movie,
  People,
  ListAlt,
  CurrencyExchange,
  Calculate,
  FilterAlt,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      color="#050f0c"
      position="fixed"
      height="100vh"
      paddingLeft={2}
      sx={{
        display: { xs: "none", sm: "block", md: "block" },
        width: { sm: "25%", md: "20%" },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/movies">
            <ListItemIcon>
              <Movie />
            </ListItemIcon>
            <ListItemText primary="Movies" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/todo">
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Task Manager" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/exchange">
            <ListItemIcon>
              <CurrencyExchange />
            </ListItemIcon>
            <ListItemText primary="Exchange" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/calculator">
            <ListItemIcon>
              <Calculate />
            </ListItemIcon>
            <ListItemText primary="Calculators" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/convert">
            <ListItemIcon>
              <FilterAlt />
            </ListItemIcon>
            <ListItemText primary="Converter" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
