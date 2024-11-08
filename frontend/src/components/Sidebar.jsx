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
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      bgcolor="#16423c"
      color="#E9EFEC"
      position="fixed"
      height="100vh"
      padding={2}
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
          <ListItemButton component={Link} to="/counter">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Counter" />
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
            <ListItemText primary="Calculator" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
