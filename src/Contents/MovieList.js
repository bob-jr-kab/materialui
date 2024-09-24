import React, { useEffect, useState } from "react";
import { fetchMovies } from "../server/server";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  TextField,
  Stack,
  Button,
} from "@mui/material";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const moviesFromApi = await fetchMovies();
      setMovies(moviesFromApi);
    };

    getMovies();
  }, []);

  return (
    <Stack>
      <Box
        // flex={8}
        justifyContent="space-around"
        alignItems="center"
        display="flex"
        flexDirection="row"
        padding={1}
      >
        <Typography variant="h5">Popular Movies</Typography>
        <Box justifyContent="center" alignItems="center" textAlign="center">
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />{" "}
          <Button>Search</Button>
        </Box>
      </Box>

      {/* Movie Cards Box */}
      <Box
        display="flex"
        // flex={8}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        padding={2}
      >
        {movies.map((movie) => (
          <Box key={movie.id} margin={1}>
            <Card sx={{ width: 200, height: 300 }}>
              <CardMedia
                component="img"
                alt={movie.title}
                height="200"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                sx={{ objectFit: "cover" }} // Ensures the image covers the area without distortion
              />

              <CardContent>
                <Typography variant="h6" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default MovieList;
