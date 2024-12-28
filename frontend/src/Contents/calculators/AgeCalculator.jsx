import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");

  const calculateAge = () => {
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);

      const years = today.getFullYear() - birth.getFullYear();
      const months = today.getMonth() - birth.getMonth();
      const days = today.getDate() - birth.getDate();

      let adjustedYears = years;
      let adjustedMonths = months;
      let adjustedDays = days;

      // Adjust for negative months or days
      if (adjustedMonths < 0) {
        adjustedYears--;
        adjustedMonths += 12;
      }
      if (adjustedDays < 0) {
        const previousMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        adjustedMonths--;
        adjustedDays += previousMonth.getDate();
      }

      setAge({
        years: adjustedYears,
        months: adjustedMonths,
        days: adjustedDays,
      });

      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      setDayOfWeek(daysOfWeek[birth.getDay()]);
    }
  };

  const resetCalculator = () => {
    setBirthDate("");
    setAge(null);
    setDayOfWeek("");
  };

  return (
    <Card
      display="flex"
      sx={{
        backgroundColor: "#e6ece9",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "300px",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Age Calculator
        </Typography>
        <TextField
          label="Date of Birth"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Box display="flex" gap={2} justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#6a9c89" }}
            onClick={calculateAge}
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
        {age && (
          <Box mt={3} textAlign="center">
            <Typography variant="h6">Age:</Typography>
            <Typography variant="body1">
              {age.years} years, {age.months} months, {age.days} days
            </Typography>
            <Typography variant="body1">Day of Birth: {dayOfWeek}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AgeCalculator;
