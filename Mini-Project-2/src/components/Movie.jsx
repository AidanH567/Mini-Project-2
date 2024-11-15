import React, { useState, useEffect } from "react";
import FilterByRating from "./Rating";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);

  const fetchMovies = async () => {
    try {
      const totalPages = 5; // Number of pages you want to fetch
      let allMovies = [];

      // Fetch movies from multiple pages
      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=2e161d44fbfea7372bf52c8f00b986ab&page=${page}`
        );
        const data = await response.json();
        allMovies = [...allMovies, ...data.results];
      }

      setMovieList(allMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = [...movieList];

    if (ratingFilter) {
      filtered = filtered.filter((movie) => movie.vote_average >= ratingFilter);
    }

    setFilteredMovies(filtered);
  }, [ratingFilter, movieList]);

  return (
    <div>
      <h1>Filter Movies by Rating</h1>
      <FilterByRating onRatingChange={setRatingFilter} />

      <h2>Movies</h2>
      <div>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "150px", margin: "10px" }}
              />
              <p>{movie.title}</p>
              <p>Rating: {movie.vote_average}</p>
              <p>Release Year: {movie.release_date.slice(0, 4)}</p>
            </div>
          ))
        ) : (
          <p>No movies found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Movie;
