import styled, { css } from 'styled-components/native';
import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { ChipBaseProps } from './Chip.types';

export const ChipBaseFeedbackContainer = styled.View`
  ${() => css`
    border-radius: 48px;
    overflow: hidden;
    position: relative;
    z-index: -1;
  `}
`;

export const ChipBaseButtonRemoveContainer = styled.View`
  ${(props) => css`
    justify-content: center;
    align-items: center;
  `}
`;

export const ChipBaseButtonBaseRemoveContainer = styled.View<ChipBaseProps>`
  ${(props) => css`
    padding: ${props.theme.spacing(1)};
  `}
`;

export const ChipBaseContainer = styled.View<ChipBaseProps>`
  ${(props) => css`
    padding: ${props.theme.spacing(0.8, 1.5)};
    background-color: ${() => {
      if (props.color == null) return props.theme.palette.primary.light;
      if (props.color === 'inherit') return props.hexColor!;
      return props.theme.palette[props.color].main;
    }};
    border-radius: 48px;
  `}
`;

export const ChipBaseText = styled.Text<ChipBaseProps>`
  ${(props) => css`
    ${props.theme.typography.body2}
    color: ${() => {
      if (props.color == null) return props.theme.palette.getContrastText(props.theme.palette.primary.light);
      switch (props.color) {
        case 'inherit':
          return props.theme.palette.getContrastText(props.hexColor!);
        default:
          return props.theme.palette.getContrastText(props.theme.palette[props.color].main);
      }
    }}
  `}
`;
