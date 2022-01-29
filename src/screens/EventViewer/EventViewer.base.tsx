import styled, { css } from 'styled-components/native';
import Paper from '@components/Paper/Paper';

export const TitleContainer = styled.View`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    padding: ${props.theme.spacing(2, 3)};
  `}
`;

export const AssignmentHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AssignmentFooterContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
