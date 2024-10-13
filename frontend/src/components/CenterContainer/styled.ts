import styled from 'styled-components';
import { Position } from '../../types';
interface StyledCenterContainerProps {
  position: 'static' | 'absolute' | 'relative' |'fixed' | 'sticky'; 
}


export const StyledCenterContainer = styled.div<StyledCenterContainerProps>`
  position: ${(props) => props.position};
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;