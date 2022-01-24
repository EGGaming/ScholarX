import Paper from '@components/Paper/Paper';
import styled, { css } from 'styled-components/native';

export const EventContainer = styled(Paper)`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    padding: ${props.theme.spacing(4)};
    margin: ${props.theme.spacing(2)};
    background-color: ${props.theme.palette.background.paper};
    border-radius: ${props.theme.borderRadius}px;
    width: 250px;
  `}
`;

export const EventHeaderContainer = styled.View`
  ${(props) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const EventActionsContainer = styled.View`
  ${(props) => css`
    display: flex;
    justify-content: flex-end;
  `}
`;
