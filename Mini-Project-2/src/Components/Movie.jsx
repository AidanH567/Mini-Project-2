import React, { useState, useReducer, useEffect, createContext } from "react";
import Genres from "./Genres";
import Year from "./Year";
import FilterByRating from "./Rating";

export const ThemeContext = createContext(null);

const initialState = {
  movies: [],
  filterQuery: "",
  loading: false,
  error: null,
};

function movieReducer(state, action) {
  switch (action.type) {
    case "SET_GENRE":
      return {
        ...state,
        filterQuery: `with_genres=${action.payload}`,
      };
    case "SET_YEAR":
      return {
        ...state,
        filterQuery: `primary_release_year=${action.payload}`,
      };
    case "SET_RATING":
      return {
        ...state,
        filterQuery: `vote_average.gte=${action.payload}`,
      };
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function Movie() {
  const [filterType, setFilterType] = useState("Genre");
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const fetchMovies = async () => {
    if (!state.filterQuery) return;

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const randomPage = Math.floor(Math.random() * 500) + 1;
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2e161d44fbfea7372bf52c8f00b986ab&${state.filterQuery}&page=${randomPage}`
      );
      const data = await response.json();
      dispatch({ type: "SET_MOVIES", payload: data.results || [] });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Something went wrong",
      });
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (state.filterQuery) {
      fetchMovies();
    }
  }, [state.filterQuery]);

  const handleFilterSelect = (type, value) => {
    dispatch({ type: `SET_${type.toUpperCase()}`, payload: value });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`p-6`} id={theme}>
        <h1 className="text-4xl font-bold text-center mb-6">Discover Movies</h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

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
          {state.movies.length > 0 ? (
            state.movies.map((movie) => (
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
                <p className="text-gray-500">
                  Release Year: {movie.release_date?.slice(0, 4)}
                </p>
                <p className="text-gray-500">Rating: {movie.vote_average}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Select a filter to see movies!
            </p>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Movie;
