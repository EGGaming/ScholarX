import { Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { BottomTabContainerProps } from './BottomTab.types';

export const BottomTabContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: ${Dimensions.get('window').width}px;
  height: 64px;
  ${(props) => css`
    border-top-color: ${props.theme.palette.divider};
    border-top-width: 1px;
  `}
`;

export const TabBarButtonBase = styled(Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity).attrs(
  (props) => {
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
  }
)``;

export const TabBarButtonContainer = styled.View<BottomTabContainerProps>`
  ${(props) => css`
    width: ${400 / props.childrenCount}px;
    height: 64px;
    align-items: center;
    justify-content: center;
  `}
`;
