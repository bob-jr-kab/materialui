import React from "react";
import { Box, TextField, Button } from "@mui/material";

const BasicCalculator = ({
  input,
  setInput,
  handleButtonClick,
  handleClear,
  handleBackspace,
  handleCalculate,
}) => {
  const styledInput = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
      backgroundColor: "#e0e0e0",
      borderRadius: "8px",
      boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
      padding: "5px 0px",
    },
    "& input": {
      animation: "none",
      textAlign: "right",
      fontSize: "1.3rem",
      fontFamily: "'Courier New', monospace",
      color: "#333",
    },
  };

  return (
    <>
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
          sx={{
            gridColumn: "span 2",
            backgroundColor: "#e2de63",
            color: "white",
          }}
          onClick={handleClear}
        >
          C
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#b96608", color: "white" }}
          onClick={handleBackspace}
        >
          ⌫
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#9b9f9d", color: "white" }}
          onClick={() => handleButtonClick("/")}
        >
          /
        </Button>

        {/* Second Row: 7, 8, 9, * */}
        {["7", "8", "9", "*"].map((item) => (
          <Button
            key={item}
            variant="contained"
            sx={{
              backgroundColor: /\d/.test(item) ? "#6a9c89" : "#9b9f9d",
              color: "white",
            }}
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
            sx={{
              backgroundColor: /\d/.test(item) ? "#6a9c89" : "#9b9f9d",
              color: "white",
            }}
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
            sx={{
              backgroundColor: /\d/.test(item) ? "#6a9c89" : "#6a9c89",
              color: "white",
            }}
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </Button>
        ))}

        {/* The + button spanning 2 rows */}
        <Button
          variant="contained"
          sx={{
            gridRow: "span 2",
            backgroundColor: "#9b9f9d",
            color: "white",
          }}
          onClick={() => handleButtonClick("+")}
        >
          +
        </Button>

        {/* Last Row: 0, ., = */}
        <Button
          variant="contained"
          sx={{ backgroundColor: "#6a9c89", color: "white" }}
          onClick={() => handleButtonClick("0")}
        >
          0
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#6a9c89", color: "white" }}
          onClick={() => handleButtonClick(".")}
        >
          .
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#26662b", color: "white" }}
          onClick={handleCalculate}
        >
          =
        </Button>
      </Box>
    </>
  );
};

export default BasicCalculator;
