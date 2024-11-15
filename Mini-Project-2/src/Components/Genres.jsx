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
    <div>
      <h2>Select a Genre</h2>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          style={{ margin: "5px" }}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default Genres;
