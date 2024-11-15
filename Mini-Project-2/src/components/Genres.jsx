import React, { useState, useEffect } from "react";

function Genres({ onSelectGenre }) {
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=2e161d44fbfea7372bf52c8f00b986ab"
      );
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Select a Genre</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Genres;
