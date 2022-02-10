import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';

export const DayButtonContainer = styled(Animated.View)<{ selected: boolean }>`
  ${(props) => css`
    border-radius: ${props.theme.borderRadius}px;
    overflow: hidden;
    margin: ${props.theme.spacing(1, 0)};
    width: 90px;
    height: 134px;
    ${() =>
      props.selected &&
      css`
        background-color: ${props.theme.mode === 'dark'
          ? props.theme.palette.toRGBA(props.theme.palette.primary.main, 0.2)
          : props.theme.palette.constants.GRAY[200]};
      `}
  `}
`;

export const EventTinyCircle = styled.View`
  ${(props) => css`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${props.theme.palette.secondary.main};
  `}
`;
