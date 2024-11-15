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
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-4">
        Discover Movies by Genre
      </h1>
      <Genres onSelectGenre={handleGenreSelect} />

      <h2 className="text-2xl text-center mt-6">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {movieList.length > 0 ? (
          movieList.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col items-center"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-lg font-semibold">{movie.title}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Select a genre to see movies!
          </p>
        )}
      </div>
    </div>
  );
}

export default Movie;
