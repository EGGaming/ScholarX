import styled, { css } from 'styled-components/native';
import { Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { SwitchBaseProps } from '@components/Switch/Switch.types';

export const SwitchBaseTouchable = styled.TouchableWithoutFeedback``;

export const SwitchBaseTouchableContainer = styled.View`
  position: relative;
`;
export const SwitchBaseCircle = styled(Animated.View)<SwitchBaseProps>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  z-index: 1;
  ${(props) => {
    if (props.color === 'inherit')
      return css`
        background-color: ${props.hexColor};
      `;
    return css`
      background-color: ${props.theme.palette[props.color].light};
    `;
  }}
  }}
`;

export const SwitchBaseContainer = styled.View<SwitchBaseProps>`
  position: relative;
  ${(props) => css`
    width: 3px;
    height: 32px;
    margin: 0 32px;
    background-color: ${() => {
      if (props.color === 'inherit') return props.hexColor;
      if (props.disabled) return props.theme.palette.action.disabledBackground;
      if (props.checked) return props.theme.palette[props.color].dark;
      return props.theme.mode === 'dark'
        ? props.theme.palette.constants.GRAY[700]
        : props.theme.palette.constants.GRAY[300];
    }};
  `}
`;

export const SwitchBaseStart = styled.View<SwitchBaseProps>`
  ${(props) => css`
    position: absolute;
    left: -32px;
    top: 0;
    height: 32px;
    width: 32px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    background-color: ${() => {
      if (props.color === 'inherit') return props.hexColor;
      if (props.disabled) return props.theme.palette.action.disabledBackground;
      if (props.checked) return props.theme.palette[props.color].dark;
      return props.theme.mode === 'dark'
        ? props.theme.palette.constants.GRAY[700]
        : props.theme.palette.constants.GRAY[300];
    }};
  `}
`;

export const SwitchBaseEnd = styled.View<SwitchBaseProps>`
  ${(props) => css`
    position: absolute;
    right: -32px;
    top: 0;
    height: 32px;
    width: 32px;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    background-color: ${() => {
      if (props.color === 'inherit') return props.hexColor;
      if (props.disabled) return props.theme.palette.action.disabledBackground;
      if (props.checked) return props.theme.palette[props.color].dark;
      return props.theme.mode === 'dark'
        ? props.theme.palette.constants.GRAY[700]
        : props.theme.palette.constants.GRAY[300];
    }};
  `}
`;
