import React, { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Preloader } from "../../components/Preloader";
import { Error } from "../../components/Error";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { modalClose } from "../../store/modal/reducer/modal";
import { modalSelector } from "../../store/modal/selectors/modal";
import { MovieCategoryUserInput, Position } from "../../types";
import { MODAL_NAME } from "../../store/modal/constants/modal";
import { CenterContainer } from "../../components/CenterContainer";
import { MovieItem } from "./components/MovieItem";
import { movieListFetchStart } from "./thunks/movieListFetch";
import { movieListCategoryCreateStart } from "./thunks/movieListCreateCategory";
import { movieListFetchSelector } from "./selectors/movieListFetch";
import { movieListCreateCategorySelector } from "./selectors/movieListCreateCategory";
import { MovieListControls } from "./components/MovieListControls";
import { MovieListSkeleton } from "./components/MovieListSkeleton";
import { ModalCategoryCreate } from "./components/ModalCategoryCreate";
import { StyledListWrapper } from "./styled";

export const MovieList = () => {
  const [paginateLoading, setPaginateLoading] = useState(false);

  const { data: movies, loading, error } = useSelector(movieListFetchSelector);
  const { loading: categoryCreateLoading } = useSelector(
    movieListCreateCategorySelector
  );
  const { open, name } = useSelector(modalSelector);

  const dispatch = useAppDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(modalClose());
  }, [dispatch]);

  const handleCreateCategorySubmit = useCallback(
    (data: MovieCategoryUserInput) => {
      dispatch(movieListCategoryCreateStart({ category: data }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(movieListFetchStart());
  }, [dispatch]);

  return (
    <>
      {loading && !error && movies.length > 0 && (
        <CenterContainer position={Position.fixed}>
          <Preloader width={96} height={96} />
        </CenterContainer>
      )}
      {!error && <MovieListControls />}
      {loading && !error && movies.length === 0 && (
        <MovieListSkeleton moviesCount={8} />
      )}
      {!error && (
        <>
          {movies.length > 0 && (
            <StyledListWrapper>
              {movies.map((movie) => (
                <MovieItem
                  key={movie._id}
                  title={movie.title}
                  releaseDate={movie.releaseDate}
                  movieId={movie._id}
                  imagePath={movie.imagePath}
                />
              ))}
            </StyledListWrapper>
          )}
          {movies.length === 0 && !loading && <h1>Nothing was found</h1>}
        </>
      )}
      {movies.length >= 8 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={64}
        >
          {paginateLoading && <Preloader />}
          {!paginateLoading && (
            <Button sx={{ height: "42px" }} variant="contained">
              Show more
            </Button>
          )}
        </Box>
      )}
      {error && !loading && <Error>{error}</Error>}
      <ModalCategoryCreate
        handleClose={handleModalClose}
        loading={categoryCreateLoading}
        handleCreateCategory={handleCreateCategorySubmit}
        open={open && name === MODAL_NAME.CATEGORY_CREATE}
      />
    </>
  );
};
