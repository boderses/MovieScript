import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  categoryDeleteInProgressAction,
  categoryDeleteSuccessAction,
  categoryDeleteErrorAction,
} from "../actions/movieListDeleteCategory";

interface Category {
  id: string;
  name: string;
}

interface MovieListDeleteCategoryState {
  loading: boolean;
  error: string | null;
}

interface MovieListState {
  categories: Category[];
  movieListDeleteCategory: MovieListDeleteCategoryState;
}

const initialState: MovieListState = {
  categories: [],
  movieListDeleteCategory: {
    loading: false,
    error: null,
  },
};

const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoryDeleteInProgressAction, (state) => {
        state.movieListDeleteCategory.loading = true;
        state.movieListDeleteCategory.error = null;
      })
      .addCase(
        categoryDeleteSuccessAction,
        (state, action: PayloadAction<{ categoryId: string }>) => {
          state.movieListDeleteCategory.loading = false;
          state.categories = state.categories.filter(
            (category) => category.id !== action.payload.categoryId
          );
        }
      )
      .addCase(
        categoryDeleteErrorAction,
        (state, action: PayloadAction<{ error: string }>) => {
          state.movieListDeleteCategory.loading = false;
          state.movieListDeleteCategory.error = action.payload.error;
        }
      );
  },
});

export default movieListSlice.reducer;
