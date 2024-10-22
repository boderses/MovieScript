import React from "react";
import { Box, Rating, Table, TableBody, TableCell } from "@mui/material";
import {
  StyledDescriptionTitle,
  StyledMovieContent,
  StyledMovieKey,
  StyledMovieTitle,
  StyledMovieValue,
  StyledTableRow,
} from "./styled";

type MovieTableContentProps = {
  date: string;
  categories: string;
  title: string;
  duration: number;
  grade: number;
  description: string;
};

export const MovieTableContent = (props: MovieTableContentProps) => {
  const { date, categories, title, duration, grade, description } = props;

  return (
    <StyledMovieContent>
      <StyledMovieTitle component="h1" as="h1">{title}</StyledMovieTitle>
      <Table sx={{ maxWidth: 600, marginBottom: "32px" }}>
        <TableBody>
          <StyledTableRow>
            <TableCell>
              <StyledMovieKey component="p" as="h1">Release date:</StyledMovieKey>
            </TableCell>
            <TableCell>
              <StyledMovieValue component="p" as="p">{date}</StyledMovieValue>
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <StyledMovieKey component="p" as="h1">Duration:</StyledMovieKey>
            </TableCell>
            <TableCell>
              <StyledMovieValue component="p" as="p">{duration} min.</StyledMovieValue>
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <StyledMovieKey component="p" as="h1">Grade:</StyledMovieKey>
            </TableCell>
            <TableCell>
              <Rating value={grade} precision={0.5} readOnly />
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <StyledMovieKey component="p" as="h1">Categories:</StyledMovieKey>
            </TableCell>
            <TableCell>
              <StyledMovieValue component="p" as="p">{categories}</StyledMovieValue>
            </TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <Box>
        <StyledDescriptionTitle component="h2" as="h2">Film description:</StyledDescriptionTitle>
        <StyledMovieValue component="p" as="p">{description}</StyledMovieValue>
      </Box>
    </StyledMovieContent>
  );
};