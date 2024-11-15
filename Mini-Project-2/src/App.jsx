import { useState } from "react";
import Movie from "./components/Movie";
import "./App.css";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex justify-center items-center py-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Movie Genre Explorer
        </h1>
      </div>
      <Movie />
    </div>
  );
}

export default App;
