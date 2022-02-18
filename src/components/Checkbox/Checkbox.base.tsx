import { CheckboxProps } from '@components/Checkbox/Checkbox.types';
import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';

export const CheckboxBase = styled.View`
  ${(props) => css`
    border-radius: ${props.theme.borderRadius / 4}px;
    overflow: hidden;
    border: 1px solid ${props.theme.palette.divider};
  `}
`;

export const CheckboxContainer = styled(Animated.View)`
  ${(props) => css`
    width: 24px;
    height: 24px;
  `}
`;

export const CheckboxFillContainer = styled(Animated.View)<Required<Pick<CheckboxProps, 'color' | 'hexColor'>>>`
  ${(props) => css`
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    background-color: ${() => {
      if (props.color == null) return props.theme.palette.primary.main;
      if (props.color === 'inherit') return props.hexColor;
      return props.theme.palette[props.color].main;
    }};
  `}
`;
