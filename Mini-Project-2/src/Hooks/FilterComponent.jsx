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
  switch (action.type) {
    case "horror":
      return `Success`;
    case "FETCH_ERROR":
      return { loading: false, posts: [], error: action.payload };
    default:
      return { ...postsResult, loading: false };
  }
}
