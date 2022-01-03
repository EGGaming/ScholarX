import NotificationsItem from '@shared/Notifications/NotificationsItem/NotificationsItem';
import React from 'react';
import { Message } from '@utilities/StudentVue/types';
import { ListRenderItem } from 'react-native';

export const RenderNotificationItem: ListRenderItem<Message> = ({ item }) => {
  return <NotificationsItem item={item} />;
};
