import React, { useState } from "react";

function Year({ onSelectYear }) {
  const [yearInput, setYearInput] = useState("");

  const handleChange = (event) => {
    setYearInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (yearInput) {
      onSelectYear(yearInput);
    }
  };

  return (
    <div>
      <label htmlFor="year">Enter Year: </label>
      <form onSubmit={handleSubmit}>
        <input
          id="year"
          type="text"
          value={yearInput}
          onChange={handleChange}
          placeholder="Enter a year (e.g., 2023)"
        />
        <button type="submit">Filter Movies</button>
      </form>
    </div>
  );
}

export default Year;
