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
  Breadcrumbs,
  Link,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
      const parsedMovies = JSON.parse(storedMovies);
      setMovies(parsedMovies);
      setFilteredMovies(parsedMovies);
    } else {
      getMovies(page);
    }
  }, []);

  useEffect(() => {
    if (page > 1) {
      getMovies(page);
    }
  }, [page]);

  const getMovies = async (page) => {
    setLoadingMore(true);
    try {
      const moviesFromApi = await fetchMovies(page);
      const updatedMovies = [...movies, ...moviesFromApi];
      setMovies(updatedMovies);
      setFilteredMovies(updatedMovies);
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoadingMore(false);
    }
  };

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

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Function to render the rating chart
  const renderRatingChart = (rating) => {
    const data = [
      { name: "Rating", value: rating },
      { name: "Remaining", value: 10 - rating },
    ];

    return (
      <ResponsiveContainer width="100%" height={50}>
        <PieChart>
          <Pie
            data={data}
            cx="10%"
            cy="45%"
            innerRadius={15}
            outerRadius={20}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? "#4CAF50" : "#E0E0E0"}
              />
            ))}
            {/* Display the rating number in the center of the chart */}
            <Label
              value={rating.toFixed(1)} // Show rating to one decimal place
              position="center"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fill: "#000", // Color of the text
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(135deg, hsla(144, 4%, 77%, 1) 10%, hsla(150, 16%, 93%, 1) 50%, hsla(144, 4%, 77%, 1) 100%)",
        paddingTop: "20px",
      }}
    >
      {/* Breadcrumbs Navigation */}
      <Box px={{ xs: 2, sm: 5, md: 10 }} mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Movies</Typography>
        </Breadcrumbs>
      </Box>

      {/* Header section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{ xs: 2, sm: 5, md: 10 }}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{ mb: { xs: 1, sm: 0 }, color: "#274b4b" }}
        >
          Popular Movies
        </Typography>

        {/* Search */}
        <Box
          display="flex"
          alignItems="center"
          width={{ xs: "100%", sm: "auto" }}
          sx={{ gap: "10px", marginTop: { xs: 1, sm: 0 } }}
        >
          <TextField
            label="Search"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                height: "40px",
              },
              "& .MuiInputLabel-root": {
                lineHeight: "20px",
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
            maxWidth="1000px"
          >
            {filteredMovies.map((movie, index) => (
              <Card
                key={movie.id ? movie.id : `movie-${index}`}
                sx={{
                  width: { xs: "46%", md: 100 },
                  height: { xs: "90", md: "150" },
                }}
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
          Loading...
        </Typography>
      )}

      {/* More button */}
      {filteredMovies.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            onClick={loadMoreMovies}
            disabled={loadingMore}
            sx={{ bgcolor: "#6A9C89" }}
          >
            {loadingMore ? "Loading..." : "More"}
          </Button>
        </Box>
      )}

      {/* Modal section */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            padding: 2,
            width: { xs: "90%", sm: 600 },
            margin: "auto",
            marginTop: { xs: "5%", sm: "5%" },
          }}
        >
          {selectedMovie && (
            <>
              <Typography variant="h5" sx={{ color: "#274b4b", mb: 1 }}>
                {selectedMovie.title}
              </Typography>
              <Typography sx={{ mb: 2 }}>{selectedMovie.overview}</Typography>
              <Typography variant="body2">
                Release Date: {selectedMovie.release_date}
              </Typography>

              {/* Render the rating chart dynamically */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Rating:
                </Typography>
                {renderRatingChart(selectedMovie.vote_average)}
              </Box>

              {trailerKey ? (
                <Box sx={{ marginTop: 2 }}>
                  <iframe
                    width="100%"
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
