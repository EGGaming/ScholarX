import Divider from '@components/Divider/Divider';
import { useNotificationReducer } from '@context/NotificationContext/NotificationContext';
import { NotificationsProps } from '@shared/Notifications/Notifications.types';
import { RenderNotificationItem } from '@shared/Notifications/Notifications.utils';
import { Message } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import React from 'react';
import { FlatList } from 'react-native';

const keyExtractor: KeyExtractor<Message> = (item) => item.$.ID;

const Notifications: React.FC<NotificationsProps> = () => {
  const [notifications] = useNotificationReducer();
  return (
    <FlatList
      extraData={notifications.unreadNotifications}
      data={notifications.notifications}
      keyExtractor={keyExtractor}
      renderItem={RenderNotificationItem}
      ItemSeparatorComponent={Divider}
    />
  );
};

export default Notifications;