import React from "react";
import { StyledMenu, StyledMenuItem } from "./styled";
import { Tooltip } from "@mui/material";

type MenuAddProps = {
  open: boolean;
  categoriesLength: number;
  handleOpenModalCategoryCreate: () => void;
  handleOpenModalMovieCreate: () => void;
  onClose: () => void;
  anchorEl: HTMLElement | null;
};

export const MenuAdd = ({
  open,
  categoriesLength,
  handleOpenModalCategoryCreate,
  handleOpenModalMovieCreate,
  anchorEl = null, // Значення за замовчуванням
  onClose,
}: MenuAddProps) => {
  const onClickCreateCategory = () => {
    handleOpenModalCategoryCreate();
    onClose();
  };

  const onClickCreateMovie = () => {
    handleOpenModalMovieCreate();
    onClose();
  };

  return (
    <StyledMenu
      id="add-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      MenuListProps={{
        "aria-labelledby": "add-button",
      }}
    >
      <Tooltip
        placement="right"
        title={categoriesLength === 0 ? "Please add at least one category" : ""}
      >
        <span>
          <StyledMenuItem
            disabled={categoriesLength === 0}
            onClick={onClickCreateMovie}
          >
            Movie
          </StyledMenuItem>
        </span>
      </Tooltip>
      <StyledMenuItem onClick={onClickCreateCategory}>Category</StyledMenuItem>
    </StyledMenu>
  );
};
