import { combineReducers } from "@reduxjs/toolkit";

import movieListFetchReducer from "./movieListFetch";
import movieListGetCategoriesReducer from "./movieListGetCategories";
import movieListCreateCategoryReducer from "./movieListCreateCategory";
import movieListDeleteCategoryReducer from "./movieListDeleteCategory";
import movieListCreateMovieReducer from "./movieListCreateMovie";
import movieListCompareViewReducer from "./movieListCompareView";

const movieListReducer = combineReducers({
  movieListFetch: movieListFetchReducer,
  movieListGetCategories: movieListGetCategoriesReducer,
  movieListCreateCategory: movieListCreateCategoryReducer,
  movieListDeleteCategory: movieListDeleteCategoryReducer,
  movieListCreateMovie: movieListCreateMovieReducer,
  movieListCompareView: movieListCompareViewReducer,
});

export default movieListReducer;
