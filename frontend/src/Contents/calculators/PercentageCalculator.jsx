import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState(null);

  const calculatePercentage = () => {
    if (value && percentage) {
      const calculatedResult = (percentage / 100) * value;
      setResult(calculatedResult);
    }
  };

  const resetCalculator = () => {
    setValue("");
    setPercentage("");
    setResult(null);
  };

  return (
    <Card
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        backgroundColor: "#e6ece9",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "300px",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Percentage Calculator
        </Typography>

        <TextField
          label="Percentage (%)"
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Value"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box display="flex" gap={2} justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#6a9c89" }}
            onClick={calculatePercentage}
          >
            Calculate
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={resetCalculator}
          >
            Reset
          </Button>
        </Box>
        {result && (
          <Box mt={3} textAlign="center">
            <Typography variant="h6">Result: {result}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PercentageCalculator;
