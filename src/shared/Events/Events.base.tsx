import styled, { css } from 'styled-components/native';
import React from 'react';

export const EventsListEmpty: React.FC = React.memo(() => {
  return null;
});

export const EventsContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(0, 3)};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}
`;
