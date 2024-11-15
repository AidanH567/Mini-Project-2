import React, { useState } from "react";

function FilterByRating({ onRatingChange }) {
  const [selectedRating, setSelectedRating] = useState("");

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    setSelectedRating(rating);
    onRatingChange(rating); // Pass the selected rating to the parent
  };

  return (
    <div>
      <label htmlFor="rating">Filter by Rating: </label>
      <input
        type="number"
        id="rating"
        placeholder="Enter rating (e.g., 7.5)"
        value={selectedRating}
        step="0.1"
        min="0"
        max="10"
        onChange={handleRatingChange}
      />
    </div>
  );
}

export default FilterByRating;
