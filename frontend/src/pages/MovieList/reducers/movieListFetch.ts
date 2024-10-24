import { createSlice } from "@reduxjs/toolkit";

import { Movie, MovieQueries } from "types";
import * as actions from "../actions/movieListFetch";
import { movieListFetchStart } from "../thunks/movieListFetch";

export type MovieListFetchState = {
  data: Movie[];
  error: string | null;
  loading: boolean;
  count: number | null;
  queries: MovieQueries;
};

const initialState: MovieListFetchState = {
  data: [],
  error: null,
  loading: true,
  count: null,
  queries: {},
};

const MOVIE_LIST_FETCH_SLICE_NAME = "MOVIE_LIST_FETCH_SLICE";

const movieListFetchSlice = createSlice({
  name: MOVIE_LIST_FETCH_SLICE_NAME,
  initialState: initialState,
  reducers: {
    movieListResetData: () => initialState,
    movieListAddQuery: actions.movieListAddQueryAction,
    movieListSetQueries: actions.movieListSetQueriesAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        movieListFetchStart.pending.type,
        actions.movieListFetchInProgressAction
      )
      .addCase(
        movieListFetchStart.fulfilled.type,
        actions.movieListFetchSuccessAction
      )
      .addCase(
        movieListFetchStart.rejected.type,
        actions.movieListFetchErrorAction
      );
  },
});

export const { movieListSetQueries, movieListAddQuery, movieListResetData } =
  movieListFetchSlice.actions;

export default movieListFetchSlice.reducer;
