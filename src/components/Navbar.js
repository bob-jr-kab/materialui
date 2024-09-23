import {
  AppBar,
  Avatar,
  Box,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import HubIcon from "@mui/icons-material/Hub";
import { Hub } from "@mui/icons-material";
const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "0 16px",
  position: "sticky",
  backgroundColor: "#16423C",
}));

const Navbar = () => {
  const [open, setOpen] = useState(false); // Avatar menu popup

  return (
    <AppBar position="sticky" sx={{ width: "100%" }}>
      <StyledToolbar>
        <Stack direction="row" gap={2} alignItems="center">
          <Hub fontSize="large" />
          <Typography>MUI Design</Typography>
        </Stack>

        <Stack direction="row" gap={2} alignItems="center">
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>
            <strong>Bob Junior</strong>
          </Typography>
          <Box
            onClick={(e) => setOpen(true)}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg?size=626&ext=jpg&ga=GA1.1.1450398461.1724012399&semt=ais_hybrid"
            />
          </Box>
        </Stack>
      </StyledToolbar>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        sx={{ marginTop: "40px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
