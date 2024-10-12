import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const Calculator = () => {
  const [input, setInput] = useState("");

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

  const styledInput = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none", // Removes the outline
      },
      "&:hover fieldset": {
        border: "none", // Removes the hover outline
      },
      "&.Mui-focused fieldset": {
        border: "none", // Removes the focus outline
      },
      backgroundColor: "#e0e0e0", // Light grey background to mimic display
      borderRadius: "8px", // Rounded corners for a soft display look
      boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)", // Inset shadow for 3D effect
      padding: "5px 0px", // Add padding inside the input field
    },
    "& input": {
      animation: "none", // Disables any input animation
      textAlign: "right", // Align text to the right, typical of calculator displays
      fontSize: "1.3rem", // Larger font size for clear visibility
      fontFamily: "'Courier New', monospace", // Monospace font for a digital look
      color: "#333", // Dark text color
    },
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter expression"
        margin="normal"
        inputProps={{ style: { textAlign: "right" } }}
        sx={styledInput}
      />
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1} mb={2}>
        {/* First Row with Clear (C) and Backspace */}
        <Button
          variant="contained"
          sx={{ gridColumn: "span 2" }}
          color="error"
          onClick={handleClear}
        >
          C
        </Button>
        <Button variant="contained" onClick={handleBackspace}>
          ⌫
        </Button>

        <Button variant="contained" onClick={() => handleButtonClick("/")}>
          /
        </Button>

        {/* Second Row: 7, 8, 9, * */}
        {["7", "8", "9", "*"].map((item) => (
          <Button
            key={item}
            variant="contained"
            color={/\d/.test(item) ? "primary" : "default"} // Blue for numbers, default for operators
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </Button>
        ))}

        {/* Third Row: 4, 5, 6, - */}
        {["4", "5", "6", "-"].map((item) => (
          <Button
            key={item}
            variant="contained"
            color={/\d/.test(item) ? "primary" : "default"}
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </Button>
        ))}

        {/* Fourth Row: 1, 2, 3 */}
        {["1", "2", "3"].map((item) => (
          <Button
            key={item}
            variant="contained"
            color={/\d/.test(item) ? "primary" : "default"}
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </Button>
        ))}

        {/* The + button spanning 2 rows */}
        <Button
          variant="contained"
          color="default"
          sx={{ gridRow: "span 2" }} // Spanning 2 rows for the "+" button
          onClick={() => handleButtonClick("+")}
        >
          +
        </Button>

        {/* Last Row: 0, ., = */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick("0")}
        >
          0
        </Button>
        <Button variant="contained" onClick={() => handleButtonClick(".")}>
          .
        </Button>
        <Button variant="contained" color="success" onClick={handleCalculate}>
          =
        </Button>
      </Box>
    </Box>
  );
};

export default Calculator;
