import React, { useState } from "react";

function FilterByRating({ onSelectRating }) {
  const ratings = [5, 6, 7, 8, 9]; // Define the different ratings to cycle through
  const [currentRating, setCurrentRating] = useState(ratings[0]);

  const handleButtonClick = () => {
    // Get the next rating in the list
    const nextRating =
      ratings[(ratings.indexOf(currentRating) + 1) % ratings.length];
    setCurrentRating(nextRating);
    onSelectRating(nextRating); // Pass the selected rating to parent
  };

  return (
    <div>
      <button onClick={handleButtonClick} style={{ margin: "5px" }}>
        Next Rating: {currentRating}
      </button>
    </div>
  );
}

export default FilterByRating;
