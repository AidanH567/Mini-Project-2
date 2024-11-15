import React, { useState } from "react";
import FilterByRating from "./Rating";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const fetchMoviesByRating = async (rating) => {
    try {
      const randomPage = Math.floor(Math.random() * 500) + 1; // Random page for fetching
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2e161d44fbfea7372bf52c8f00b986ab&vote_average.gte=${rating}&page=${randomPage}`
      );
      const data = await response.json();
      setMovieList(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleRatingSelect = (rating) => {
    setMovieList([]); // Clear existing movie list before fetching new data
    fetchMoviesByRating(rating); // Fetch movies based on rating
    setSelectedRating(rating); // Update selected rating
  };

  return (
    <div>
      <h1>Discover Movies by Rating</h1>
      <FilterByRating onSelectRating={handleRatingSelect} />{" "}
      {/* Rating filter button */}
      <h2>Movies</h2>
      <div>
        {movieList.length > 0 ? (
          movieList.map((movie) => (
            <div key={movie.id} style={{ marginBottom: "20px" }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "150px", margin: "10px" }}
              />
              <p>{movie.title}</p>
              <p>Rating: {movie.vote_average}</p>
            </div>
          ))
        ) : (
          <p>Select a rating to see movies!</p>
        )}
      </div>
    </div>
  );
}

export default Movie;
