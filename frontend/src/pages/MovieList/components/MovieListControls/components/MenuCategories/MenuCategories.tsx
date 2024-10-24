import React from "react";
import PropTypes from "prop-types";
import { Preloader } from "components/Preloader";
import { Error } from "components/Error";
import { CenterContainer } from "components/CenterContainer";
import { MovieCategory } from "types";
import { Category } from "../Category";
import { CategoriesSkeleton } from "../CategoriesSkeleton";
import { StyledMenu } from "./styled";

type MenuCategoriesProps = {
  open: boolean;
  loading: boolean;
  error: string | null;
  categories: MovieCategory[];
  onClose: () => void;
  anchorEl: Element | null;
};

export const MenuCategories = (props: MenuCategoriesProps) => {
  const { open, loading, error, categories, anchorEl, onClose } = props;

  return (
    <StyledMenu
      id="categories-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      MenuListProps={{
        "aria-labelledby": "categories-button",
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
        categories.map((category) => (
          <Category key={category._id} category={category} />
        ))}
      {!error && !loading && categories.length === 0 && (
        <h1>Nothing was found</h1>
      )}
    </StyledMenu>
  );
};

MenuCategories.defaultProps = {
  anchorEl: null,
};

MenuCategories.propTypes = {
  anchorEl: PropTypes.instanceOf(Element),
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};
