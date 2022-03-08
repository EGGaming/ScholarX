import Paper from '@components/Paper/Paper';
import Space from '@components/Space/Space';
import isIphoneWithNotch from '@utilities/isIphoneWithNotch';
import { Dimensions, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';

export const BottomTabHeaderContainer = styled.View`
  ${(props) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props.theme.palette.background.paper};
    ${() => {
      if (isIphoneWithNotch())
        return css`
          padding: ${getStatusBarHeight() + 8}px ${props.theme.spacing(3, 0.5, 3)};
        `;
      return css`
        padding: ${props.theme.spacing(0.5, 3)};
      `;
    }}
    border-bottom-color: ${props.theme.palette.divider};
    border-bottom-width: 1px;
  `}
`;

export const StatusBarSpace = styled.View`
  ${(props) => css`
    background-color: ${props.theme.palette.background.default};
    width: ${Dimensions.get('window').width}px;
    height: ${StatusBar.currentHeight! ?? 0}px;
  `}
`;

export const HeaderContainer = styled.View`
  ${(props) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props.theme.palette.background.default};
    ${() => {
      if (isIphoneWithNotch())
        return css`
          padding: ${getStatusBarHeight() + 20}px ${props.theme.spacing(2, 1.5, 2)};
        `;
      return css`
        padding: ${props.theme.spacing(1.5, 2)};
      `;
    }}
  `}
`;
