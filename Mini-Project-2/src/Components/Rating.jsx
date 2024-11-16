import React, { useState } from "react";

function FilterByRating({ onSelectRating }) {
  const ratings = [5, 6, 7, 8, 9];
  const [currentRating, setCurrentRating] = useState(ratings[0]);

  const handleButtonClick = () => {
    const nextRating =
      ratings[(ratings.indexOf(currentRating) + 1) % ratings.length];
    setCurrentRating(nextRating);
    onSelectRating(nextRating);
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
