import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Basic mock authentication logic
    if (username && password) {
      // Replace with actual login logic
      localStorage.setItem("isAuthenticated", "true"); // Save authentication status
      alert("Login successful!");
      navigate("/"); // Redirect to home page
    } else {
      alert("Please enter a valid username and password.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "flex-start", md: "center" },
        textAlign: "center",
        backgroundImage:
          "linear-gradient(135deg, hsla(144, 4%, 77%, 1) 10%, hsla(150, 16%, 93%, 1) 50%, hsla(144, 4%, 77%, 1) 100%)",
        minHeight: "100vh",
        color: "#274b4b",
        paddingTop: { xs: 3, md: 0 },
        overflow: "hidden",
        position: "sticky",
      }}
    >
      <Typography variant="h4" gutterBottom>
        React Spectrum Login
      </Typography>
      <Stack
        spacing={2}
        sx={{
          width: { xs: "90%", sm: "400px" },
          mt: { xs: 3, md: 0 },
          color: "#3a7171",
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            bgcolor: "#6a9c89",
            color: "white",
            mt: 2,
            ":hover": {
              bgcolor: "#5b8878",
            },
          }}
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
