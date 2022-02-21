import { FloatingButtonProps } from '@components/Floating/FloatingButton/FloatingButton.types';
import Paper from '@components/Paper/Paper';
import styled, { css } from 'styled-components/native';

export const FloatingBaseButtonContainer = styled(Paper)<FloatingButtonProps>`
  ${(props) => css`
    border-radius: 1000px;
    background-color: ${() => {
      if (props.color === 'inherit') return props.hexColor;
      return props.theme.palette[props.color ?? 'primary'].main;
    }}
    overflow: hidden;
  `}
`;

export const FloatingButtonContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(2.5)};
  `}
`;
