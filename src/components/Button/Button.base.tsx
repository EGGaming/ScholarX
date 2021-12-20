import styled, { css } from 'styled-components/native';
import { RequireAll } from '@utilities/TypeUtilities';
import Typography from '@components/Typography/Typography';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { ButtonAccessoryProps, ButtonProps } from '@components/Button/Button.types';

export const ButtonBase = styled(Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity).attrs<
  RequireAll<ButtonProps>
>((props) => {
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
})<RequireAll<ButtonProps>>``;

export const ButtonBaseContainer = styled.View<RequireAll<ButtonProps>>`
  ${(props) => css`
    display: flex;
    flex-direction: row;
    padding: ${props.theme.spacing(1.3, 2.5)};
    ${() => {
      if (props.color === 'inherit')
        return css`
          border: 1px solid ${props.hexColor};
        `;
      switch (props.variant) {
        case 'text':
        case 'contained':
          return css`
            border: 1px solid transparent;
          `;
        case 'outlined':
          return css`
            border: 1px solid ${props.theme.palette[props.color].main};
          `;
      }
    }}
    ${() => {
      if (props.color === 'inherit')
        return css`
          background-color: ${props.hexColor};
        `;
      switch (props.variant) {
        case 'text':
          return css``;
        case 'contained':
          return css`
            background-color: ${props.theme.palette[props.color].main};
          `;
      }
    }}
  `}
`;

export const ButtonText = styled.Text<RequireAll<ButtonProps>>`
  ${(props) => css`
    ${() => {
      if (props.color === 'inherit')
        return css`
          color: ${props.hexColor};
        `;
      switch (props.variant) {
        case 'text':
        case 'outlined':
          return css`
            color: ${props.theme.palette[props.color].main};
          `;
        case 'contained':
          return css`
            color: ${props.theme.palette.getContrastText(props.theme.palette[props.color].main)};
          `;
      }
    }}
    ${props.theme.typography.button};
  `}
`;

export const ButtonIconContainer = styled.View<Required<{ placement?: ButtonAccessoryProps['iconPlacement'] }>>`
  ${(props) => {
    switch (props.placement) {
      case 'left':
        return css`
          padding: ${props.theme.spacing(0, 2, 0, 0)};
        `;
      case 'right':
        return css`
          padding: ${props.theme.spacing(0, 0, 0, 2)};
        `;
    }
  }}
`;
