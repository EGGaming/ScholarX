import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Container from '@components/Container/Container';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import { useNotificationReducer } from '@context/NotificationContext/NotificationContext';
import Notifications from '@shared/Notifications/Notifications';
import React from 'react';
import { View } from 'react-native';

const NotificationsScreen: React.FC = () => {
  const [notifications] = useNotificationReducer();
  return <Notifications notifications={notifications.notifications} />;
};

export default NotificationsScreen;
