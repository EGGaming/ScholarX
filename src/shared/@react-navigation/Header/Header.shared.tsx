import Space from '@components/Space/Space';
import styled, { css } from 'styled-components/native';

export const BottomTabHeaderContainer = styled.View`
  ${(props) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props.theme.palette.background.default};
    padding: ${props.theme.spacing(4.5, 3, 0.5, 3)};
    border-bottom-color: ${props.theme.palette.divider};
    border-bottom-width: 1px;
  `}
`;

export const HeaderContainer = styled.View`
  ${(props) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props.theme.palette.background.default};
    padding: ${props.theme.spacing(6, 2, 2, 2)};
  `}
`;
