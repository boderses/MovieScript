import React, { ReactNode } from "react";
import { Position } from "types";
import { StyledCenterContainer } from "./styled";

type CenterContainerProps = {
  children: ReactNode;
  position?: Position;
};

export const CenterContainer = ({
  children,
  position = Position.absolute,
}: CenterContainerProps) => {
  return (
    <StyledCenterContainer $position={position}>
      {children}
    </StyledCenterContainer>
  );
};
