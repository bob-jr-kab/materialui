import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  styled,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import {
  Hub,
  Menu as MenuIcon,
  Home,
  People,
  Settings,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "0", // Remove padding to eliminate white space
  position: "sticky",
  backgroundColor: "#16423C",
}));

const Navbar = () => {
  const [open, setOpen] = useState(false); // Drawer state

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ width: "100%" }}>
        <StyledToolbar>
          <Stack direction="row" gap={2} alignItems="center">
            {/* Show MenuIcon toggle in place of the logo on small devices */}
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Hub
              fontSize="large"
              sx={{ display: { xs: "none", sm: "block" } }}
            />
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              React Spectrum
            </Typography>
          </Stack>

          <Stack direction="row" gap={2} alignItems="center">
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              <strong>Bob Junior</strong>
            </Typography>
            <Box>
              <Avatar
                alt="Remy Sharp"
                src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg?size=626&ext=jpg&ga=GA1.1.1450398461.1724012399&semt=ais_hybrid"
              />
            </Box>
          </Stack>
        </StyledToolbar>
      </AppBar>

      {/* Drawer for sidebar items */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }} // Adjust width as needed
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem component={Link} to="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Movies" />
            </ListItem>
            <ListItem component={Link} to="/counter">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Counter" />
            </ListItem>
            <ListItem component={Link} to="/todo">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="To Do List" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
