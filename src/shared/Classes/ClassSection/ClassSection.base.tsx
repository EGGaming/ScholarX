import styled, { css } from 'styled-components/native';

export const ClassSectionContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(1.5, 3)};
    background-color: ${props.theme.palette.background.default};
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-top-color: ${props.theme.palette.divider};
    border-bottom-color: ${props.theme.palette.divider};
  `}
`;
