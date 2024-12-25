import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Box,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
} from "@mui/material";

const UnitConverter = () => {
  const [unitType, setUnitType] = useState("length");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("kilometers");

  const unitOptions = {
    length: ["meters", "kilometers", "miles", "feet"],
    weight: ["grams", "kilograms", "pounds", "ounces"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
    mass: ["grams", "kilograms", "pounds", "ounces"],
    time: ["seconds", "minutes", "hours", "days"],
  };

  const convert = (value, from, to) => {
    let result = parseFloat(value);

    if (isNaN(result)) return "";

    switch (unitType) {
      case "length":
        if (from === "meters" && to === "kilometers") result /= 1000;
        else if (from === "kilometers" && to === "meters") result *= 1000;
        else if (from === "meters" && to === "miles") result *= 0.000621371;
        else if (from === "miles" && to === "meters") result /= 0.000621371;
        else if (from === "feet" && to === "meters") result *= 0.3048;
        else if (from === "meters" && to === "feet") result /= 0.3048;
        break;
      case "weight":
        if (from === "grams" && to === "kilograms") result /= 1000;
        else if (from === "kilograms" && to === "grams") result *= 1000;
        else if (from === "grams" && to === "pounds") result *= 0.00220462;
        else if (from === "pounds" && to === "grams") result /= 0.00220462;
        break;
      case "temperature":
        if (from === "celsius" && to === "fahrenheit")
          result = (result * 9) / 5 + 32;
        else if (from === "fahrenheit" && to === "celsius")
          result = ((result - 32) * 5) / 9;
        else if (from === "celsius" && to === "kelvin") result += 273.15;
        else if (from === "kelvin" && to === "celsius") result -= 273.15;
        break;
      case "time":
        if (from === "seconds" && to === "minutes") result /= 60;
        else if (from === "minutes" && to === "seconds") result *= 60;
        else if (from === "minutes" && to === "hours") result /= 60;
        else if (from === "hours" && to === "minutes") result *= 60;
        else if (from === "hours" && to === "days") result /= 24;
        else if (from === "days" && to === "hours") result *= 24;
        break;
      case "mass":
        if (from === "grams" && to === "kilograms") result /= 1000;
        else if (from === "kilograms" && to === "grams") result *= 1000;
        else if (from === "grams" && to === "pounds") result *= 0.00220462;
        else if (from === "pounds" && to === "grams") result /= 0.00220462;
        break;
      default:
        return "";
    }

    return result.toFixed(2);
  };

  const handleFromValueChange = (value) => {
    setFromValue(value);
    setToValue(convert(value, fromUnit, toUnit));
  };

  const handleToValueChange = (value) => {
    setToValue(value);
    setFromValue(convert(value, toUnit, fromUnit));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        padding: "2%",
        overflow: "hidden", // Prevent content from overflowing
        overscrollBehavior: "none", // Prevents overscrolling
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          backgroundColor: "#e6ece9",
          color: "#274b4b",
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Unit Converter
          </Typography>
          <TextField
            select
            label="Unit Type"
            value={unitType}
            onChange={(e) => {
              setUnitType(e.target.value);
              setFromUnit(unitOptions[e.target.value][0]);
              setToUnit(unitOptions[e.target.value][1]);
              setFromValue("");
              setToValue("");
            }}
          >
            <MenuItem value="length">Length</MenuItem>
            <MenuItem value="weight">Weight</MenuItem>
            <MenuItem value="temperature">Temperature</MenuItem>
            <MenuItem value="mass">Mass</MenuItem>
            <MenuItem value="time">Time</MenuItem>
          </TextField>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              label="From Value"
              type="number"
              value={fromValue}
              onChange={(e) => handleFromValueChange(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Typography>=</Typography>
            <TextField
              label="To Value"
              type="number"
              value={toValue}
              onChange={(e) => handleToValueChange(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              select
              label="From Unit"
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                setToValue(convert(fromValue, e.target.value, toUnit));
              }}
              sx={{ flex: 1 }}
            >
              {unitOptions[unitType].map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="To Unit"
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value);
                setToValue(convert(fromValue, fromUnit, e.target.value));
              }}
              sx={{ flex: 1 }}
            >
              {unitOptions[unitType].map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UnitConverter;
