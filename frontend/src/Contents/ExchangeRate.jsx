import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
} from "@mui/material";
import { SwapHoriz as SwapIcon } from "@mui/icons-material";

const ExchangeRate = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("TRY");
  const [baseAmount, setBaseAmount] = useState(1);
  const [targetAmount, setTargetAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencyResponse = await axios.get(
          "https://openexchangerates.org/api/currencies.json"
        );
        setAvailableCurrencies(Object.entries(currencyResponse.data));
      } catch (error) {
        console.error("Error fetching currency list:", error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`
        );
        setExchangeRate(response.data.conversion_rates[targetCurrency]);
        setTargetAmount(
          baseAmount * response.data.conversion_rates[targetCurrency]
        );
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setExchangeRate(1);
      }
    };

    fetchExchangeRate();
  }, [baseCurrency, targetCurrency, baseAmount]);

  const handleBaseAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    setBaseAmount(amount);
    setTargetAmount(amount * exchangeRate);
  };

  const handleTargetAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    setTargetAmount(amount);
    setBaseAmount(amount / exchangeRate);
  };

  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
    setBaseAmount(targetAmount);
    setTargetAmount(baseAmount);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        padding: "2%",
        overflow: "hidden", // Prevent content from overflowing
        overscrollBehavior: "none", // Prevents overscrolling
        backgroundImage:
          "linear-gradient(135deg, hsla(144, 4%, 77%, 1) 10%, hsla(150, 16%, 93%, 1) 50%, hsla(144, 4%, 77%, 1) 100%)",
      }}
    >
      {/* Breadcrumbs Navigation */}
      <Box px={2} mb={2} width="100%">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Exchange Rate</Typography>
        </Breadcrumbs>
      </Box>

      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          backgroundColor: "#e6ece9",
          color: "#274b4b",
        }}
      >
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Currency Exchange Rate
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <TextField
                select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
              >
                {availableCurrencies.map(([code, name]) => (
                  <MenuItem key={code} value={code}>
                    {`${code} - ${name}`}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label={`Base Currency (${baseCurrency})`}
                type="number"
                value={baseAmount}
                onChange={handleBaseAmountChange}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={2} textAlign="center">
              <IconButton onClick={swapCurrencies} color="inherit">
                <SwapIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={5}>
              <TextField
                select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                variant="outlined"
                fullWidth
              >
                {availableCurrencies.map(([code, name]) => (
                  <MenuItem key={code} value={code}>
                    {`${code} - ${name}`}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label={`Target Currency (${targetCurrency})`}
                type="number"
                value={targetAmount}
                onChange={handleTargetAmountChange}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExchangeRate;
