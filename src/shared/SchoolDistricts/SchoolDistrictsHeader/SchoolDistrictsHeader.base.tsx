import styled, { css } from 'styled-components/native';

export const SchoolDistrictsHeaderBaseContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(6, 2, 2, 2)};
  `}
`;
