import styled, { css } from 'styled-components/native';

export const GradeSymbolContainer = styled.View`
  ${(props) => css`
    background-color: ${props.theme.palette.background.default};
    padding: ${props.theme.spacing(1)};
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: ${props.theme.borderRadius}px;
  `}
`;
