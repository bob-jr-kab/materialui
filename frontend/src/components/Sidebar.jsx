import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home, People, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      bgcolor="#16423C"
      flex={2}
      color="#E9EFEC"
      position="fixed"
      height="100vh"
      padding={2}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <Home />
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
              <Settings />
            </ListItemIcon>
            <ListItemText primary="To Do List" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
