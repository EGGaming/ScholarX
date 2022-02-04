import styled, { css } from 'styled-components/native';

export const GradeSymbolContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(1)};
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: ${props.theme.borderRadius}px;
  `}
`;

export const ClassInfoContainer = styled.View`
  width: 66%;
`;
