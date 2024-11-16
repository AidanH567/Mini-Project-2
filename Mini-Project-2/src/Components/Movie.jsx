import React, { useState } from "react";
import Genres from "./Genres";
import Year from "./year";
import FilterByRating from "./Rating";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [filterType, setFilterType] = useState("Genre");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const fetchMovies = async (filterQuery) => {
    try {
      const randomPage = Math.floor(Math.random() * 500) + 1;
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2e161d44fbfea7372bf52c8f00b986ab&${filterQuery}&page=${randomPage}`
      );
      const data = await response.json();
      setMovieList(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleFilterSelect = (type, value) => {
    setSelectedFilter(value);
    let filterQuery = "";

    if (type === "Genre") {
      filterQuery = `with_genres=${value}`;
    } else if (type === "Year") {
      filterQuery = `primary_release_year=${value}`;
    } else if (type === "Rating") {
      filterQuery = `vote_average.gte=${value}`;
    }

    fetchMovies(filterQuery);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Discover Movies</h1>

      <div className="flex justify-center mb-6">
        {["Genre", "Year", "Rating"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 mx-2 text-white rounded ${
              filterType === type
                ? "bg-blue-600"
                : "bg-blue-400 hover:bg-blue-500"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="mb-6">
        {filterType === "Genre" && (
          <Genres onSelectGenre={(id) => handleFilterSelect("Genre", id)} />
        )}
        {filterType === "Year" && (
          <Year onSelectYear={(year) => handleFilterSelect("Year", year)} />
        )}
        {filterType === "Rating" && (
          <FilterByRating
            onSelectRating={(rating) => handleFilterSelect("Rating", rating)}
          />
        )}
      </div>

      <h2 className="text-2xl text-center mb-6">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              <p className="text-gray-500">{`Release Year: ${movie.release_date?.slice(
                0,
                4
              )}`}</p>
              <p className="text-gray-500">{`Rating: ${movie.vote_average}`}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Select a filter to see movies!
          </p>
        )}
      </div>
    </div>
  );
}

export default Movie;
