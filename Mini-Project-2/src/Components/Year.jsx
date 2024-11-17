import React from "react";

const Year = ({ onSelectYear }) => {
  const years = Array.from({ length: 50 }, (_, i) => 2024 - i); // Last 50 years
  return (
    <div>
      <select
        onChange={(e) => onSelectYear(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Year;
