import React, { useState } from "react";
import { AddCircle, RemoveCircle, RestartAlt } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  CardHeader,
  Avatar,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
const StyledButton = styled(Button)({
  backgroundColor: "#6A9C89",
  textTransform: "none",
});
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(0);
  };
  return (
    <Box
      color="red"
      padding={2}
      align="center"
      height="100vh"
      sx={{
        width: "100%",
        backgroundImage:
          "linear-gradient(135deg, hsla(144, 4%, 77%, 1) 10%, hsla(150, 16%, 93%, 1) 50%, hsla(144, 4%, 77%, 1) 100%)",
      }}
    >
      <Card
        sx={{ maxWidth: { xs: "100%", sm: "50%", backgroundColor: "#e6ece9" } }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#C4DAD2" }} aria-label="recipe">
              C
            </Avatar>
          }
          title="Counter Program"
          subheader="September 15, 2024"
        />
        <CardContent>
          <h1>{count}</h1>
          <Typography> </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="right"
            justifyContent="center"
          >
            <StyledButton
              variant="contained"
              startIcon={<RemoveCircle />}
              onClick={decrement}
            >
              Decrement
            </StyledButton>
            <StyledButton
              variant="contained"
              startIcon={<RestartAlt />}
              onClick={reset}
            >
              Reset
            </StyledButton>
            <StyledButton
              variant="contained"
              endIcon={<AddCircle />}
              onClick={increment}
            >
              Increment
            </StyledButton>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Counter;
