import styled, { css } from 'styled-components/native';
import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { ChipBaseProps } from './Chip.types';
import Animated from 'react-native-reanimated';

export const ChipBaseFeedbackContainer = styled(Animated.View)`
  ${() => css`
    border-radius: 48px;
    overflow: hidden;
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
    padding: ${props.theme.spacing(0.5)};
    border-radius: 1000px;
    overflow: hidden;
  `}
`;

export const ChipBaseContainer = styled.View<ChipBaseProps>`
  ${(props) => css`
    padding: ${props.theme.spacing(1, 2)};
    ${() => {
      if (props.color === 'inherit')
        return css`
          border: 1px solid ${props.hexColor};
        `;
      switch (props.variant) {
        case 'contained':
          return css`
            border: 1px solid transparent;
          `;
        case 'outlined':
          return css`
            border: 1px solid
              ${props.disabled
                ? props.theme.palette.toRGBA(
                    props.theme.palette[props.color].main,
                    props.theme.palette.action.disabledOpacity
                  )
                : props.theme.palette[props.color].main};
          `;
      }
    }}
    ${() => {
      if (props.color === 'inherit')
        return css`
          background-color: ${props.hexColor};
        `;
      switch (props.variant) {
        case 'contained':
          return css`
            background-color: ${props.disabled
              ? props.theme.palette.toRGBA(
                  props.theme.palette[props.color].main,
                  props.theme.palette.action.disabledOpacity
                )
              : props.theme.palette[props.color].main};
          `;
      }
    }}
    border-radius: 48px;
  `}
`;

export const ChipBaseText = styled.Text<ChipBaseProps>`
  ${(props) => css`
    font-size: 14px;

    ${() => {
      if (props.color === 'inherit')
        return css`
          color: ${props.hexColor};
        `;
      switch (props.variant) {
        case 'outlined':
          return css`
            color: ${props.disabled
              ? props.theme.palette.toRGBA(
                  props.theme.palette[props.color].main,
                  props.theme.palette.action.disabledOpacity
                )
              : props.theme.palette[props.color].main};
          `;
        case 'contained':
          return css`
            color: ${props.disabled
              ? props.theme.palette.toRGBA(
                  props.theme.palette.getContrastText(props.theme.palette[props.color].main),
                  props.theme.palette.action.disabledOpacity
                )
              : props.theme.palette.getContrastText(props.theme.palette[props.color].main)};
          `;
      }
    }}
  `}
`;
