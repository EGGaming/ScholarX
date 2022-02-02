import styled, { css } from 'styled-components/native';
export const ClassesHeaderContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(0, 3)};
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: space-between;
  `}
`;
