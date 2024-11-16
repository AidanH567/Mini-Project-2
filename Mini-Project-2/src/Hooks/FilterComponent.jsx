import { useEffect, useReducer } from "react";
export default function useFilterReducer() {
  const [postsResult, dispatch] = useReducer(reducer, {
    loading: true,
    posts: [],
    error: "",
  });
  console.log(dispatch({ type: "horror" }));
}

function reducer(postsResult, action) {
  // if (type === "Genre") {
  //   filterQuery = `with_genres=${value}`;
  // } else if (type === "Year") {
  //   filterQuery = `primary_release_year=${value}`;
  // } else if (type === "Rating") {
  //   filterQuery = `vote_average.gte=${value}`;
  // }

  switch (action.type) {
    case "horror":
      // return `with_genres=${value}`;
      return `Success`;
    case "FETCH_ERROR":
      return { loading: false, posts: [], error: action.payload };
    default:
      return { ...postsResult, loading: false };
  }
}
