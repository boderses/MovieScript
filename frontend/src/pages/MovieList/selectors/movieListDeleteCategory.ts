import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

const movieListDeleteCategoryStateSelector = (state: RootState) =>
  state.movieList.movieListCreateCategory; 

export const movieListDeleteCategorySelector = createSelector(
  movieListDeleteCategoryStateSelector,
  (state) => ({
    loading: state.loading,
    error: state.error    
  })
);
