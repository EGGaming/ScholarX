import styled, { css } from 'styled-components/native';
import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { ChipBaseProps } from './Chip.types';

export const ChipBase = styled(
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
).attrs<ChipBaseProps>((props) => {
  if (props.color === 'inherit')
    return {
      activeOpacity: 0.5,
    };
  switch (props.theme.mode) {
    case 'dark':
      return {
        background: TouchableNativeFeedback.Ripple(props.theme.palette[props.color].dark, false),
        activeOpacity: 0.5,
      };
    case 'light':
      return {
        background: TouchableNativeFeedback.Ripple(props.theme.palette[props.color].light, false),
        activeOpacity: 0.5,
      };
  }
})<ChipBaseProps>``;

export const ChipBaseContainer = styled.View<ChipBaseProps>`
  ${(props) => css`
    padding: ${props.theme.spacing(0.8, 1.2)};
    background-color: ${() => {
      if (props.color === 'inherit') return props.hexColor!;
      return props.theme.palette[props.color].main;
    }};
  `}
`;
