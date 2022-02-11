import styled, { css } from 'styled-components/native';

export const AssignmentViewerContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(0, 3)};
  `}
`;
