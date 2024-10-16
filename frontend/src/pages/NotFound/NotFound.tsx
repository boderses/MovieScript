import React from "react";
import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import {
  StyledContainer,
  StyledContent,
  StyledDescription,
  StyledLink,
} from "./styled";

export const NotFound = () => {
  return (
    <StyledContainer>
      <StyledContent>
        <StyledDescription>Page not found</StyledDescription>
        <StyledLink to="/">
          <Button size="large" variant="contained" endIcon={<ArrowForward />}>
            Home
          </Button>
        </StyledLink>
      </StyledContent>
    </StyledContainer>
  );
};
