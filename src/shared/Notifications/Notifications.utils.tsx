import NotificationsItem from '@shared/Notifications/NotificationsItem/NotificationsItem';
import React from 'react';
import { Message } from 'studentvue';
import { ListRenderItem } from 'react-native';

export const RenderNotificationItem: ListRenderItem<Message> = ({ item }) => {
  return <NotificationsItem item={item} />;
};
