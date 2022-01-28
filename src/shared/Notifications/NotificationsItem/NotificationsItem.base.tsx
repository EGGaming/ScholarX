import Paper from '@components/Paper/Paper';
import { NotificationsItemContainerProps } from '@shared/Notifications/NotificationsItem/NotificationsItem.types';
import styled, { css } from 'styled-components/native';

export const NotificationsItemContainer = styled.View<NotificationsItemContainerProps>`
  ${(props) => css`
    background-color: ${props.theme.palette.background.paper};
    padding: ${props.theme.spacing(2, 3)};
    ${props.read
      ? `
      border-left-width: 5px;
      border-left-color: ${props.theme.palette.secondary.main};
    `
      : ``}
  `}
`;

export const NotificationItemHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
