import styled, { css } from 'styled-components/native';
import Paper from '@components/Paper/Paper';

export const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

export const AssignmentContainer = styled(Paper)`
  ${(props) => css`
    border-radius: ${props.theme.borderRadius}px;
    margin: ${props.theme.spacing(1)};
    padding: ${props.theme.spacing(3)};
  `}
`;

export const AssignmentHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
