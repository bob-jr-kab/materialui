import React, { useEffect, useState } from "react";
import {
  fetchMovies,
  fetchMovieDetails,
  fetchMovieTrailers,
} from "../api/movieApi";
import {
  Card,
  Typography,
  Box,
  TextField,
  Button,
  Modal,
  CardMedia,
} from "@mui/material";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const moviesFromApi = await fetchMovies();
      setMovies(moviesFromApi);
      setFilteredMovies(moviesFromApi);
    };

    getMovies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchTerm, movies]);

  const handleMovieClick = async (movieId) => {
    const movieDetails = await fetchMovieDetails(movieId);
    setSelectedMovie(movieDetails);

    const trailers = await fetchMovieTrailers(movieId);
    if (trailers.length > 0) {
      setTrailerKey(trailers[0].key);
    } else {
      setTrailerKey(null);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
    setTrailerKey(null);
  };

  return (
    <Box>
      {/* Header section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        px={{ xs: 2, sm: 5, md: 10 }} // Adjust margin left and right for responsive design
        sx={{
          flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
          alignItems: { xs: "flex-start", sm: "center" }, // Align left on small screens
        }}
      >
        {/* Title aligned to the left */}
        <Typography variant="h5" sx={{ mb: { xs: 1, sm: 0 } }}>
          Popular Movies
        </Typography>

        {/* Search and button aligned to the right */}
        <Box
          display="flex"
          alignItems="center"
          width={{ xs: "100%", sm: "auto" }} // Full width on small screens
          sx={{ gap: "10px", marginTop: { xs: 1, sm: 0 } }} // Remove gap for smaller screens
        >
          <TextField
            label="Search"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                height: "40px", // Adjust the height here
              },
              "& .MuiInputLabel-root": {
                lineHeight: "20px", // Center label vertically
              },
            }}
          />
          <Button
            onClick={() => setSearchTerm(searchTerm)}
            variant="contained"
            sx={{ minWidth: 100, padding: "8px 16px", bgcolor: "#6A9C89" }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Movie list section */}
      {filteredMovies.length > 0 ? (
        <Box display="flex" justifyContent="center" padding={2}>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            maxWidth="1200px"
          >
            {filteredMovies.map((movie) => (
              <Card
                key={movie.id}
                sx={{ width: { xs: "45%", md: 200 }, height: 300 }} // Adjust width for small screens
                onClick={() => handleMovieClick(movie.id)}
              >
                <CardMedia
                  component="img"
                  alt={movie.title}
                  height="auto"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            ))}
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" align="center" mt={4}>
          No movies available.
        </Typography>
      )}

      {/* Modal section */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            padding: 2,
            width: 600,
            margin: "auto",
            marginTop: "5%",
          }}
        >
          {selectedMovie && (
            <>
              <Typography variant="h6">{selectedMovie.title}</Typography>
              <Typography variant="body1">{selectedMovie.overview}</Typography>
              <Typography variant="body2">
                Release Date: {selectedMovie.release_date}
              </Typography>
              <Typography variant="body2">
                Rating: {selectedMovie.vote_average}
              </Typography>

              {trailerKey ? (
                <Box sx={{ marginTop: 2 }}>
                  <iframe
                    width="80%"
                    height="250"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
              ) : (
                <Typography variant="body2" color="error">
                  No trailer available for this movie.
                </Typography>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default MovieList;
