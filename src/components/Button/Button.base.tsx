import styled, { css } from 'styled-components/native';
import { RequireAll } from '@utilities/TypeUtilities';
import Typography from '@components/Typography/Typography';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { ButtonAccessoryProps, ButtonProps } from '@components/Button/Button.types';
import { AppColors } from '@theme/core.types';

export const BaseContainer = styled.View`
  ${(props) => css`
    border-radius: ${props.theme.borderRadius}px;
    overflow: hidden;
  `}
`;

export const ButtonBase = styled(Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity).attrs<{
  color?: AppColors;
  hexColor?: string;
  round?: boolean;
}>((props) => {
  const { round = false } = props;
  if (props.color == null) {
    switch (props.theme.mode) {
      case 'dark':
        return {
          background: TouchableNativeFeedback.Ripple(props.theme.palette.primary.dark, round),
          activeOpacity: 0.5,
        };
      case 'light':
        return {
          background: TouchableNativeFeedback.Ripple(props.theme.palette.constants.GRAY['300'], round),
          activeOpacity: 0.5,
        };
    }
  } else {
    if (props.color === 'inherit')
      return {
        activeOpacity: 0.5,
      };
    switch (props.theme.mode) {
      case 'dark':
        return {
          background: TouchableNativeFeedback.Ripple(props.theme.palette[props.color].dark, round),
          activeOpacity: 0.5,
        };
      case 'light':
        return {
          background: TouchableNativeFeedback.Ripple(props.theme.palette[props.color].light, round),
          activeOpacity: 0.5,
        };
    }
  }
})<{
  color?: AppColors;
  hexColor?: string;
  round?: boolean;
}>``;

export const ButtonBaseContainer = styled.View<RequireAll<ButtonProps>>`
  ${(props) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    ${() => {
      switch (props.size) {
        case 'small':
          return css`
            padding: ${props.theme.spacing(0.8, 1.5)};
          `;
        case 'medium':
          return css`
            padding: ${props.theme.spacing(1.2, 2)};
          `;
      }
    }}
    ${() => {
      if (props.textCentered)
        return css`
          justify-content: center;
        `;
      return css`
        justify-content: flex-start;
      `;
    }}
    border-radius: ${props.theme.borderRadius}px;
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
        case 'text':
          return css``;
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
  `}
`;

export const ButtonText = styled.Text<RequireAll<ButtonProps>>`
  ${(props) => css`
    ${() => {
      switch (props.size) {
        case 'small':
          return props.theme.typography['small-button'];
        case 'medium':
          return props.theme.typography.button;
      }
    }}
    ${() => {
      if (props.color === 'inherit')
        return css`
          color: ${props.hexColor};
        `;
      switch (props.variant) {
        case 'text':
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
