import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // List of tools in the project with their routes
  const tools = [
    // { label: "To-Do List", path: "/todo" },
    { label: "Calendar", path: "/calendar" },
    { label: "Calculator", path: "/calculator" },
    { label: "Currency Exchange", path: "/exchange" },
    { label: "Converter", path: "/convert" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: {
          xs: "center",
          //   md: "flex-start",
          sm: "flex-start",
        },
        textAlign: "center",
        minHeight: "100vh",
        color: "white",
        // paddingTop: { xs: 3, md: 0 },
        position: "fixed",
        // width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#274b4b" }}>
        Welcome to React Spectrum
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 3, color: "#3a7171" }}>
        React Spectrum is your one-stop platform for various React-based tools
        and components designed to make your tasks easier.
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        {tools.map((tool, index) => (
          <Chip
            key={index}
            label={tool.label}
            clickable
            onClick={() => navigate(tool.path)}
            sx={{ margin: 1, color: "white", backgroundColor: "#6a9c89" }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default HomePage;
