import { TextFieldAccessoryProps, TextFieldProps } from '@components/TextField/TextField.types';
import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

export const TextFieldAdornmentEndContainer = styled.View`
  position: absolute;
  top: 18px;
  right: 18px;
`;

export const TextFieldAdornmentStartContainer = styled.View`
  position: absolute;
  top: 18px;
  left: 18px;
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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  `}
`;

export const TextFieldBase = styled.TextInput<TextFieldAccessoryProps>`
  width: 100%;
  ${(props) => css`
    padding: ${props.theme.spacing(2, props.adornmentEnd ? 7 : 2, 2, props.adornmentStart ? 7 : 2)};
    background-color: ${props.theme.palette.background.paper};
    color: ${props.theme.palette.text.primary};
    border-radius: 4px;
    border: 1px solid ${props.theme.palette.divider};
    ${props.theme.typography.body};
  `}
`;
