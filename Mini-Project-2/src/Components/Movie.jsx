import React, { useState, useReducer, useEffect } from "react";
import Genres from "./Genres";
import Year from "./year";
import FilterByRating from "./Rating";
import useFilterReducer from "../Hooks/FilterComponent";

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
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null,
      };
    //Need to do this for set_year, set_rating, set_movies (handle loading and error), set_loading, set_error
    default:
      return state;
  }
}

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [filterType, setFilterType] = useState("Genre");
  const [state, dispatch] = useReducer(movieReducer, initialState);

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
        payload: error.message || "something went wrong",
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

  // const handleFilterSelect = (type, value) => {
  //   // setSelectedFilter(value);
  //   // dispatch({ type: "", value: value });
  //   // console.log(Genre);
  //   // fetchMovies(Genre);
  //   let filterQuery = "";
  //   if (type === "Genre") {
  //     filterQuery = `with_genres=${value}`;
  //   } else if (type === "Year") {
  //     filterQuery = `primary_release_year=${value}`;
  //   } else if (type === "Rating") {
  //     filterQuery = `vote_average.gte=${value}`;
  //   }
  //   fetchMovies(filterQuery);
  // };

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

// function reducer(postsResult, action) {
//   // if (type === "Genre") {
//   //   filterQuery = `with_genres=${value}`;
//   // } else if (type === "Year") {
//   //   filterQuery = `primary_release_year=${value}`;
//   // } else if (type === "Rating") {
//   //   filterQuery = `vote_average.gte=${value}`;
//   // }

//   switch (action.type) {
//     case "Genre":
//       return `with_genres=${action.value}`;
//     case "Year":
//       return `primary_release_year=${action.value}`;
//     // return `Success`;
//     case "FETCH_ERROR":
//       return { loading: false, posts: [], error: action.payload };
//     default:
//       return { ...postsResult, loading: false };
//   }
// }

export default Movie;
