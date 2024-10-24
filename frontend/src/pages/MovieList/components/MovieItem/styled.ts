import { CardContent, Card, Typography, TypographyProps } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  height: 400px;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.5)
    );
  }
`;

export const StyledCardContainer = styled(Link)`
  width: 100%;
  margin: 0;
  margin-bottom: 8px;
  text-decoration: none;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 50%;
    & > div {
      margin-right: 4px;
    }
    &:nth-of-type(even) > div {
      margin-right: 0;
      margin-left: 4px;
    }
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 33.3%;
    & > div {
      margin: 0 4px;
    }
    &:nth-of-type(even) > div {
      margin-bottom: 0;
      margin-right: 4px;
    }
    &:nth-of-type(3n + 1) > div {
      margin: 0;
      margin-right: 4px;
    }
    &:nth-of-type(3n) > div {
      margin: 0;
      margin-left: 4px;
    }
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    width: 25%;
    & > div,
    &:nth-of-type(even) > div,
    &:nth-of-type(3n) > div,
    &:nth-of-type(3n + 1) > div {
      margin: 0 4px;
    }
    &:nth-of-type(4n + 1) > div {
      margin: 0;
      margin-right: 4px;
    }
    &:nth-of-type(4n) > div {
      margin: 0;
      margin-left: 4px;
    }
  }
`;

export const StyledImage = styled("img")`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledCardContent = styled(CardContent)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  height: 100%;
`;

export const StyledTitle = styled(Typography).attrs((props: TypographyProps) => ({
  variant: "h6",
  component: props.component || "h2",
}))`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  width: 80%;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  color: white;
`;

export const StyledTextData = styled.span`
  width: 20%;
  text-align: right;
  line-height: 1.6;
  color: ${(props) => props.theme.palette.grey[300]};
`;
