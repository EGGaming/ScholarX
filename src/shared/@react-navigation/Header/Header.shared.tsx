import Paper from '@components/Paper/Paper';
import Space from '@components/Space/Space';
import { Dimensions, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';

export const BottomTabHeaderContainer = styled.View`
  ${(props) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props.theme.palette.background.paper};
    padding: ${props.theme.spacing(0.5, 3)};
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
    padding: ${props.theme.spacing(1.5, 2)};
  `}
`;
