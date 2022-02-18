import { FloatingProps } from '@components/Floating/Floating.types';
import { Dimensions, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';
export const FloatingBase = styled(Animated.View).attrs({ pointerEvents: 'box-none' })<FloatingProps>`
  position: absolute;
  top: ${StatusBar.currentHeight ?? 0}px;
  right: 0;
  bottom: 0;
  left: 0;
  ${(props) => css`
    margin: ${props.theme.spacing(4)};
    align-items: ${() => {
      if (props.horizontalPlacement == null) return 'stretch';
      switch (props.horizontalPlacement) {
        case 'center':
          return 'center';
        case 'left':
          return 'flex-start';
        case 'right':
          return 'flex-end';
      }
    }}
    justify-content: ${() => {
      switch (props.verticalPlacement) {
        default:
        case 'top':
          return 'flex-start';
        case 'center':
          return 'center';
        case 'bottom':
          return 'flex-end';
      }
    }}
  `}
`;
