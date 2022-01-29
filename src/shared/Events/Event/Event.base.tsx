import Card from '@components/Card/Card';
import styled, { css } from 'styled-components/native';

export const EventContainer = styled(Card)`
  ${(props) => css`
    display: flex;
    flex-direction: row;
  `}
`;

export const EventContentContainer = styled.View`
  ${(props) => css`
    flex-grow: 1;
    flex-direction: column;
    padding: ${props.theme.spacing(0, 2)};
  `}
`;

export const EventIconContainer = styled.View`
  ${(props) => css`
    flex-shrink: 1;
    justify-content: center;
    padding: ${props.theme.spacing(0, 0, 0, 1)};
  `}
`;

export const EventActionsContainer = styled.View`
  ${(props) => css`
    flex-shrink: 1;
    justify-content: center;
  `}
`;
