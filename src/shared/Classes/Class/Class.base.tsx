import styled, { css } from 'styled-components/native';

export const GradeSymbolContainer = styled.View`
  ${(props) => css`
    width: 100px;
    justify-content: center;
    align-items: center;
    display: flex;
  `}
`;

export const ClassInfoContainer = styled.View`
  width: 60%;
`;

export const ClassContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(1, 0)};
  `}
`;
