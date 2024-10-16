import { styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled("div")`
  position: relative;
  height: calc(100vh - 76px);
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const StyledTitle = styled(Typography)`
  font-weight: 900;
  font-size: 10rem;
  letter-spacing: 0.5rem;
` as typeof Typography;

export const StyledContent = styled("div")`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

export const StyledDescription = styled("span")`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;
