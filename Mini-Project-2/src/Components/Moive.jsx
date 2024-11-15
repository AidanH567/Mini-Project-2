import React, { useState } from "react";
import Genres from "./Genres";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const randomPage = Math.floor(Math.random() * 500) + 1;
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2e161d44fbfea7372bf52c8f00b986ab&with_genres=${genreId}&page=${randomPage}`
      );
      const data = await response.json();
      setMovieList(data.results || []);
      setSelectedGenre(genreId);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleGenreSelect = (genreId) => {
    if (genreId === selectedGenre) {
      fetchMoviesByGenre(genreId);
    } else {
      setMovieList([]);
      fetchMoviesByGenre(genreId);
    }
  };

  return (
    <div>
      <h1>Discover Movies by Genre</h1>
      <Genres onSelectGenre={handleGenreSelect} />

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
            </div>
          ))
        ) : (
          <p>Select a genre to see movies!</p>
        )}
      </div>
    </div>
  );
}

export default Movie;
