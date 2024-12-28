import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert cm to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);
      determineBMICategory(bmiValue);
    }
  };

  const determineBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obesity");
    }
  };

  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setBMI(null);
    setCategory("");
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
          BMI Calculator
        </Typography>
        <TextField
          label="Weight (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Height (cm)"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#6a9c89" }}
            onClick={calculateBMI}
            // sx={{ margin: "16px 0" }}
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
        {bmi && (
          <Box mt={2} textAlign="center">
            <Typography variant="h6">Your BMI: {bmi}</Typography>
            <Typography variant="body1">Category: {category}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BMICalculator;
