import React, {
  MouseEvent,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";
import {
  Box,
  Button,
  FormControl,
  Select,
  ListItemText,
  Input,
  IconButton,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  Tune as FilterListIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Compare as CompareIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import debounce from "lodash.debounce";

import { Search } from "components/Search";
import { Preloader } from "components/Preloader";
import { CenterContainer } from "components/CenterContainer";
import { Error } from "components/Error";

import { useAppDispatch } from "store";
import { modalOpen } from "store/modal/reducer/modal";
import { MODAL_NAME } from "store/modal/constants/modal";

import { MovieQueries, SortMoviesOptions } from "types";
import { setQueries } from "utils/setQueries";
import { movieListGetCategoriesSelector } from "../../selectors/movieListGetCategories";
import { deleteCategoryStart } from "../../thunks/movieListDeleteCategories";
import { movieListGetCategoriesStart } from "../../thunks/movieListGetCategories";
import { movieListFetchStart } from "../../thunks/movieListFetch";
import { movieListBeforeCreateMovieStart } from "../../thunks/movieListCreateMovie";
import { movieListCompareViewGetMoviesStart } from "../../thunks/movieListCompareView";
import { movieListCompareViewSelector } from "../../selectors/movieListCompareView";
import { movieListAddQuery } from "../../reducers/movieListFetch";
import { ConfirmationModal } from "../ModalCategoryDeleteConfirmation";

import { MenuAdd } from "./components/MenuAdd";
import { CategoriesSkeleton } from "./components/CategoriesSkeleton";
import { StyledCheckbox, StyledMenuItem, sxSelectCategory } from "./styled";

type MovieListControlsProps = {
  queries: MovieQueries;
};

export const MovieListControls = (props: MovieListControlsProps) => {
  const { queries } = props;
  const {
    data: categories,
    loading,
    error,
  } = useSelector(movieListGetCategoriesSelector);
  const dispatch = useAppDispatch();

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleOpenConfirmDelete = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
    setCategoryToDelete(null);
  };

  const handleConfirmDeleteCategory = async () => {
    if (categoryToDelete) {
      await dispatch(deleteCategoryStart(categoryToDelete));
      await dispatch(movieListGetCategoriesStart());
      await dispatch(movieListFetchStart());
    }
    handleCloseConfirmDelete();
  };

  const removeLimitQuery = () => {
    const query = { name: "limit", value: null };
    setQueries(query);
    dispatch(movieListAddQuery({ query }));
  };

  const getMovieList = (query: { name: string; value: string | null }) => {
    setQueries(query);
    removeLimitQuery();
    dispatch(movieListFetchStart());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(getMovieList, 500), []);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorElAddMenu, setAnchorElAddMenu] = useState<HTMLElement | null>(
    null
  );

  const open = Boolean(anchorEl);
  const openAddMenu = Boolean(anchorElAddMenu);

  const sortActions = {
    asc: () => {
      const query = { name: "sort", value: SortMoviesOptions.desc };
      dispatch(movieListAddQuery({ query }));
      return query;
    },
    desc: () => {
      const query = { name: "sort", value: null };
      dispatch(movieListAddQuery({ query }));
      return query;
    },
  };

  const onClickSortButton = () => {
    let query;
    if (queries.sort && sortActions[queries.sort]) {
      query = sortActions[queries.sort]();
    } else {
      query = { name: "sort", value: SortMoviesOptions.asc };
      dispatch(movieListAddQuery({ query }));
    }
    getMovieList(query);
  };

  const handleOpenMenuCategories = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenAddMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElAddMenu(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCloseAddMenu = () => {
    setAnchorElAddMenu(null);
  };

  const handleOpenModalMovieCreate = useCallback(() => {
    dispatch(modalOpen({ name: MODAL_NAME.MOVIE_CREATE }));
    dispatch(movieListBeforeCreateMovieStart());
  }, [dispatch]);

  const handleOpenModalCategoryCreate = useCallback(() => {
    dispatch(modalOpen({ name: MODAL_NAME.CATEGORY_CREATE }));
  }, [dispatch]);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = {
      name: "search",
      value: event.target.value === "" ? null : event.target.value,
    };
    dispatch(movieListAddQuery({ query }));
    debounceFn(query);
  };

  const compareMovies = useSelector(movieListCompareViewSelector);

  const handleOpenModalCompareView = useCallback(() => {
    dispatch(modalOpen({ name: MODAL_NAME.MOVIE_COMPARE_VIEW }));
    dispatch(
      movieListCompareViewGetMoviesStart({
        movieIdList: compareMovies,
      })
    );
  }, [dispatch, compareMovies]);

  const handleChangeCategory = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const categoryList = typeof value === "string" ? value.split(",") : value;
    const query = {
      name: "categories",
      value: categoryList.length === 0 ? null : categoryList.join(","),
    };
    dispatch(movieListAddQuery({ query }));
    getMovieList(query);
  };

  useEffect(() => {
    dispatch(movieListGetCategoriesStart());
  }, [dispatch]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap="8px"
      marginBottom="16px"
      flexWrap="wrap"
    >
      <Search value={queries.search || ""} onChange={handleChangeSearch} />
      <FormControl>
        <Button
          id="openMenu"
          color="secondary"
          variant="contained"
          sx={{ height: "100%" }}
          onClick={handleOpenMenuCategories}
          startIcon={<FilterListIcon />}
        >
          Categories
        </Button>
        <Select
          multiple
          value={queries.categories?.split(",") || []}
          onChange={handleChangeCategory}
          input={<Input id="select-multiple-checkbox" />}
          style={{ display: "none" }}
          open={open}
          onClose={handleClose}
          renderValue={(selected) => selected.join(",")}
          MenuProps={{
            anchorEl: document.getElementById("openMenu"),
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              sx: sxSelectCategory,
            },
          }}
        >
          {loading && !error && categories.length > 0 && (
            <CenterContainer>
              <Preloader />
            </CenterContainer>
          )}
          {loading && !error && categories.length === 0 && (
            <CategoriesSkeleton categoriesCount={4} />
          )}
          {!error &&
            categories.length > 0 &&
            categories.map((category) => {
              const categoryParams = queries.categories || "";
              const isChecked =
                categoryParams.split(",").indexOf(category.name) > -1;
              return (
                <StyledMenuItem
                  color="secondary"
                  key={category._id}
                  value={category.name}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <StyledCheckbox disableRipple={true} checked={isChecked} />
                  <ListItemText primary={category.name} />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleOpenConfirmDelete(category._id)}
                    sx={{ marginLeft: "auto" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledMenuItem>
              );
            })}
          {!error && !loading && categories.length === 0 && (
            <StyledMenuItem disabled>Nothing was found</StyledMenuItem>
          )}
          {error && !loading && <Error>{error}</Error>}
        </Select>
      </FormControl>
      <Button
        onClick={onClickSortButton}
        variant="contained"
        color="info"
        startIcon={
          (queries.sort === SortMoviesOptions.desc && <ArrowUpwardIcon />) ||
          (queries.sort === SortMoviesOptions.asc && <ArrowDownwardIcon />) || (
            <SortIcon />
          )
        }
      >
        Sort
      </Button>
      <Button
        aria-controls={openAddMenu ? "add-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openAddMenu ? "true" : undefined}
        variant="outlined"
        color="light"
        startIcon={<AddIcon />}
        onClick={handleOpenAddMenu}
      >
        Add
      </Button>
      <Tooltip
        title={
          compareMovies.length <= 1
            ? "Please, add movies to compare them"
            : "Compare view"
        }
      >
        <span>
          <IconButton
            disabled={compareMovies.length <= 1}
            onClick={handleOpenModalCompareView}
          >
            <CompareIcon />
          </IconButton>
        </span>
      </Tooltip>
      <MenuAdd
        categoriesLength={categories.length}
        handleOpenModalCategoryCreate={handleOpenModalCategoryCreate}
        handleOpenModalMovieCreate={handleOpenModalMovieCreate}
        anchorEl={anchorElAddMenu}
        open={openAddMenu}
        onClose={handleCloseAddMenu}
      />
      {}
      <ConfirmationModal
        open={openConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onConfirm={handleConfirmDeleteCategory}
        categoryName={categoryToDelete ? categories.find(category => category._id === categoryToDelete)?.name || "" : ""}
      />
    </Box>
  );
};
