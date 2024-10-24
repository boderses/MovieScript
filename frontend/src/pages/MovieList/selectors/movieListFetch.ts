import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";

const movieListSelector = (state: RootState) => state.movieList.movieListFetch;

export const movieListFetchSelector = createSelector(
  movieListSelector,
  (state) => ({
    data: state.data,
    loading: state.loading,
    error: state.error,
    count: state.count,
    queries: state.queries,
  })
);
