import styled, { css } from 'styled-components/native';

export const NotificationsItemContainer = styled.View`
  ${(props) => css`
    margin: ${props.theme.spacing(2)};
  `}
`;
