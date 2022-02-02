import { AdornmentProps, TextFieldAccessoryProps, TextFieldProps } from '@components/TextField/TextField.types';
import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const TextFieldAdornmentEndContainer = styled.View<AdornmentProps>`
  ${(props) => {
    switch (props.size) {
      case 'medium':
        return css`
          position: absolute;
          top: 18px;
          right: 18px;
        `;
      case 'small':
        return css`
          position: absolute;
          top: 12px;
          right: 12px;
        `;
    }
  }}
`;

export const TextFieldAdornmentStartContainer = styled.View<AdornmentProps>`
  ${(props) => {
    switch (props.size) {
      case 'medium':
        return css`
          position: absolute;
          top: 18px;
          left: 18px;
        `;
      case 'small':
        return css`
          position: absolute;
          top: 12px;
          left: 12px;
        `;
    }
  }}
`;

export const TextFieldBaseContainer = styled.View<Required<TextFieldProps>>`
  position: relative;
  ${(props) => css`
    width: ${() => {
      switch (typeof props.width) {
        case 'number':
          return `${props.width}px`;
        default:
        case 'string':
          return props.width;
      }
    }};
    flex-direction: row;
    justify-content: flex-start;
  `}
`;

export const TextFieldBase = styled.TextInput<TextFieldAccessoryProps>`
  flex-grow: 1;
  ${(props) => {
    switch (props.size!) {
      case 'medium':
        return css`
          padding: ${props.theme.spacing(2, props.adornmentEnd ? 7 : 2, 2, props.adornmentStart ? 7 : 2)};
          background-color: ${props.theme.palette.background.paper};
          color: ${props.theme.palette.text.primary};
          border-radius: ${props.theme.borderRadius}px;
          border: 1px solid ${props.error ? props.theme.palette.error.main : props.theme.palette.divider};
          ${props.theme.typography.body};
        `;
      case 'small':
        return css`
          padding: ${props.theme.spacing(1, props.adornmentEnd ? 5 : 1, 1, props.adornmentStart ? 5 : 1)};
          background-color: ${props.theme.palette.background.paper};
          color: ${props.theme.palette.text.primary};
          border-radius: ${props.theme.borderRadius}px;
          border: 1px solid ${props.error ? props.theme.palette.error.main : props.theme.palette.divider};
          ${props.theme.typography.body2};
        `;
    }
  }}
`;
