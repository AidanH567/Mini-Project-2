import React, { useState } from "react";
import Year from "./year";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const fetchMoviesByYear = async (year) => {
    try {
      const randomPage = Math.floor(Math.random() * 500) + 1;
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2e161d44fbfea7372bf52c8f00b986ab&primary_release_year=${year}&page=${randomPage}`
      );
      const data = await response.json();
      setMovieList(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleYearSelect = (year) => {
    setMovieList([]);
    fetchMoviesByYear(year);
    setSelectedYear(year);
  };

  return (
    <div>
      <h1>Discover Movies by Year</h1>
      <Year onSelectYear={handleYearSelect} />
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
              <p>Release Year: {movie.release_date.slice(0, 4)}</p>
            </div>
          ))
        ) : (
          <p>Select a year to see movies!</p>
        )}
      </div>
    </div>
  );
}

export default Movie;
