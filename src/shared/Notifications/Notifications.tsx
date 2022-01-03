import { NotificationsProps } from '@shared/Notifications/Notifications.types';
import { RenderNotificationItem } from '@shared/Notifications/Notifications.utils';
import { Message } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import React from 'react';
import { FlatList } from 'react-native';

const keyExtractor: KeyExtractor<Message> = (item) => item.$.ID;

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  return <FlatList data={notifications} keyExtractor={keyExtractor} renderItem={RenderNotificationItem} />;
};

export default React.memo(Notifications);
