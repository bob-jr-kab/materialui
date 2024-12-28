import React, { useState } from "react";
import { Box, Chip } from "@mui/material";
import BMICalculator from "./calculators/BMICalculator";
import PercentageCalculator from "./calculators/PercentageCalculator";
import AgeCalculator from "./calculators/AgeCalculator";
import BasicCalculator from "./calculators/BasicCalculator";

const Calculator = () => {
  const [showBasicCalculator, setShowBasicCalculator] = useState(true); // Default to true
  const [showBMICalculator, setShowBMICalculator] = useState(false);
  const [showAgeCalculator, setShowAgeCalculator] = useState(false);
  const [showPercentageCalculator, setShowPercentageCalculator] =
    useState(false);
  const [input, setInput] = useState("");

  const handleBasicCalculatorClick = () => {
    setShowBasicCalculator(true);
    setShowBMICalculator(false);
    setShowPercentageCalculator(false);
    setShowAgeCalculator(false);
  };

  const handleBMIClick = () => {
    setShowBMICalculator(true);
    setShowBasicCalculator(false);
    setShowPercentageCalculator(false);
    setShowAgeCalculator(false);
  };

  const handlePercentageClick = () => {
    setShowPercentageCalculator(true);
    setShowBasicCalculator(false);
    setShowBMICalculator(false);
    setShowAgeCalculator(false);
  };

  const handleAgecalculatorClick = () => {
    setShowAgeCalculator(true);
    setShowBasicCalculator(false);
    setShowPercentageCalculator(false);
    setShowBMICalculator(false);
  };

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      const evalResult = new Function(`'use strict'; return (${input})`)();
      setInput(evalResult.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      p={2}
    >
      {/* Chips to toggle calculators */}
      <Box
        mb={2}
        display="flex"
        gap={2}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          overflowX: "auto", // Enables horizontal scrolling
          gap: 2, // Adds space between chips
          paddingBottom: 1, // Adds padding for better appearance
        }}
      >
        <Chip
          label="Basic Calculator"
          clickable
          color="warning"
          onClick={handleBasicCalculatorClick}
        />
        <Chip
          label="BMI Calculator"
          clickable
          color="primary"
          onClick={handleBMIClick}
        />
        <Chip
          label="Percentage Calculator"
          clickable
          color="secondary"
          onClick={handlePercentageClick}
        />
        <Chip
          label="Age Calculator"
          clickable
          color="secondary"
          onClick={handleAgecalculatorClick}
        />
      </Box>

      {showBasicCalculator && (
        <BasicCalculator
          input={input}
          setInput={setInput}
          handleButtonClick={handleButtonClick}
          handleClear={handleClear}
          handleBackspace={handleBackspace}
          handleCalculate={handleCalculate}
        />
      )}
      {showBMICalculator && <BMICalculator />}
      {showPercentageCalculator && <PercentageCalculator />}
      {showAgeCalculator && <AgeCalculator />}
    </Box>
  );
};

export default Calculator;
