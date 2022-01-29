import Paper from '@components/Paper/Paper';
import { AppColors } from '@theme/core.types';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export const CardContainer = styled.View`
  ${(props) => css`
    background-color: ${props.theme.palette.background.paper};
    border-radius: ${props.theme.borderRadius}px;
    padding: ${props.theme.spacing(3)};
  `}
`;

export const CardBaseButtonContainer = styled.View`
  ${(props) => css`
    border-radius: ${props.theme.borderRadius}px;
    overflow: hidden;
    margin: ${props.theme.spacing(1, 3)};
    ${() => {
      switch (Platform.OS) {
        case 'android':
          return css`
            elevation: 5;
          `;
        case 'ios':
          return css`
            shadow-color: #000;
            shadow-offset: 0px 2px;
            shadow-opacity: 0.25;
            shadow-radius: 3.84px;
          `;
      }
    }}
  `};
`;

export const CardButtonBase = styled(Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity).attrs<{
  color?: AppColors;
  hexColor?: string;
}>((props) => {
  if (props.color == null) {
    switch (props.theme.mode) {
      case 'dark':
        return {
          background: TouchableNativeFeedback.Ripple(props.theme.palette.primary.dark, true),
          activeOpacity: 0.5,
        };
      case 'light':
        return {
          background: TouchableNativeFeedback.Ripple(props.theme.palette.constants.GRAY['300'], true),
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
          background: TouchableNativeFeedback.Ripple(props.theme.palette[props.color].dark, true),
          activeOpacity: 0.5,
        };
      case 'light':
        return {
          background: TouchableNativeFeedback.Ripple(props.theme.palette[props.color].light, true),
          activeOpacity: 0.5,
        };
    }
  }
})<{
  color?: AppColors;
  hexColor?: string;
}>``;
