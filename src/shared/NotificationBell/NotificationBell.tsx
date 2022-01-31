import Badge from '@components/Badge/Badge';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import { useNotificationReducer } from '@context/NotificationContext/NotificationContext';
import { useBottomTabNavigation } from '@navigators/BottomTab/BottomTab';
import { BottomTabParamList } from '@navigators/BottomTab/BottomTab.types';
import { useRootNavigation } from '@navigators/Root/Root';
import { RootStackParamList, RootStackNavigationProps } from '@navigators/Root/Root.types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

const NotificationBell: React.FC = () => {
  const [notifications] = useNotificationReducer();
  const navigation = useRootNavigation();
  function onPress() {
    navigation.navigate('Notifications');
  }

  return (
    <Badge badgeCount={notifications.unreadNotifications.length} color='secondary'>
      <IconButton icon={<Icon bundle='Feather' name='mail' />} onPress={onPress} />
    </Badge>
  );
};

export default React.memo(NotificationBell);
