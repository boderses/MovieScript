import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { MovieFormSchema, MovieCategory } from "types";
import { AppDispatch } from "store";
import { createMovie, createMovieImage } from "api/movies";
import { getCategories } from "api/categories";
import { modalClose } from "store/modal/reducer/modal";
import {
  movieCreateInProgress,
  movieCreateError,
  movieCreateSuccess,
} from "../reducers/movieListCreateMovie";
import { movieListFetchStart } from "./movieListFetch";

const MOVIE_LIST_CREATE_MOVIE_START_TYPE = "MOVIE_LIST_CREATE_MOVIE_START";

export const movieListCreateMovieStart = createAsyncThunk<
  void,
  { movie: MovieFormSchema },
  { dispatch: AppDispatch }
>(MOVIE_LIST_CREATE_MOVIE_START_TYPE, async (data, { dispatch }) => {
  try {
    const { movie } = data;
    const file = movie.imagePath[0];
    const formData = new FormData();
    formData.append("file", file);
    const image = await createMovieImage(formData);

    const updatedMovie = {
      _id: image.id,
      imagePath: image.url,
      categories: movie.fetchCategories.filter((category) =>
        movie.categories.includes(category.name)
      ),
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      releaseDate: movie.releaseDate,
      grade: movie.grade,
    };
    dispatch(movieCreateInProgress());

    await createMovie(updatedMovie);

    dispatch(modalClose());

    dispatch(movieCreateSuccess());
    await dispatch(movieListFetchStart());
    toast.success("Movie created successfully!");
  } catch (error) {
    dispatch(movieCreateError({ error: error as string }));
    toast.error(error as string);
  }
});

const MOVIE_LIST_BEFORE_CREATE_MOVIE_START_TYPE =
  "MOVIE_LIST_BEFORE_CREATE_MOVIE_START";

export const movieListBeforeCreateMovieStart = createAsyncThunk<
  { data: MovieCategory[] },
  never
>(
  MOVIE_LIST_BEFORE_CREATE_MOVIE_START_TYPE,
  async (_data, { rejectWithValue }) => {
    try {
      const categories = await getCategories();

      return { data: categories };
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);
