import { React, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home, People } from "@mui/icons-material";

import Settings from "@mui/icons-material/Settings";
const Sidebar = ({ onSelectComponent }) => {
  return (
    <Box
      bgcolor="#6A9C89"
      flex={2}
      color="#E9EFEC"
      position="fixed"
      height="100vh"
      padding={2}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onSelectComponent("Movies")}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Movies" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => onSelectComponent("Counter")}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Counter" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => onSelectComponent("Settings")}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settiings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
