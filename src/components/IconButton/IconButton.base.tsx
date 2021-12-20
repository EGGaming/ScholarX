import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { IconButtonProps } from './IconButton.types';

export const IconButtonBaseContainer = styled.View<Required<IconButtonProps>>`
  ${(props) => css`
    padding: ${props.theme.spacing(1)};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${() => {
      switch (props.size) {
        case 'large':
          return css`
            width: 64px;
            height: 64px;
            border-top-left-radius: 32px;
            border-top-right-radius: 32px;
            border-bottom-left-radius: 32px;
            border-bottom-right-radius: 32px;
          `;
        case 'medium':
          return css`
            width: 48px;
            height: 48px;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
            border-bottom-left-radius: 24px;
            border-bottom-right-radius: 24px;
          `;
        case 'small':
          return css`
            width: 44px;
            height: 44px;
            border-top-left-radius: 22px;
            border-top-right-radius: 22px;
            border-bottom-left-radius: 22px;
            border-bottom-right-radius: 22px;
          `;
      }
    }}
    ${() => {
      switch (props.variant) {
        case 'text':
        case 'contained':
          return css`
            border: 1px solid transparent;
          `;
        case 'outlined':
          if (props.color === 'inherit')
            return css`
              border: 1px solid ${props.hexColor};
            `;
          return css`
            border: 1px solid ${props.theme.palette[props.color].main};
          `;
      }
    }}
    ${() => {
      switch (props.variant) {
        case 'text':
        case 'outlined':
          return css``;
        case 'contained':
          if (props.color === 'inherit')
            return css`
              background-color: ${props.hexColor};
            `;
          return css`
            background-color: ${props.theme.palette[props.color].main};
          `;
      }
    }}
  `}
`;

export const IconButtonBase = styled(Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity).attrs<
  Required<IconButtonProps>
>((props) => {
  if (props.color === 'inherit')
    return {
      activeOpacity: 0.5,
    };
  switch (props.theme.mode) {
    case 'dark':
      return {
        background: TouchableNativeFeedback.Ripple(props.theme.palette[props.color].dark, true),
        activeOpacity: 0.5,
      };
    case 'light':
      return {
        background: TouchableNativeFeedback.Ripple(props.theme.palette[props.color].light, true),
        activeOpacity: 0.5,
      };
  }
})<Required<IconButtonProps>>``;
