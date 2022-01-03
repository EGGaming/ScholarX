import Paper from '@components/Paper/Paper';
import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

export const CardContainer = styled(Paper)`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    padding: ${props.theme.spacing(3)};
    border-radius: 16px;
  `}
`;

export const CardActionsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
