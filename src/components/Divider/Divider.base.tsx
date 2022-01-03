import styled, { css } from 'styled-components/native';

export const VerticalDivider = styled.View`
  ${(props) => css`
    width: 1px;
    height: 100%;
    background-color: ${props.theme.palette.divider};
  `}
`;

export const HorizontalDivider = styled.View`
  ${(props) => css`
    width: 100%;
    height: 1px;
    background-color: ${props.theme.palette.divider};
  `}
`;
