import Badge from '@components/Badge/Badge';
import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useRootNavigation } from '@navigators/Root/Root';
import { NotificationsItemContainer } from '@shared/Notifications/NotificationsItem/NotificationsItem.base';
import { NotificationsItemProps } from '@shared/Notifications/NotificationsItem/NotificationsItem.types';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

const NotificationsItem: React.FC<NotificationsItemProps> = ({ item }) => {
  const unread = React.useMemo(() => !JSON.parse(item.$.Read) as boolean, [item.$.Read]);
  const navigation = useRootNavigation();
  function onMessagePress() {
    navigation.navigate('NotificationViewer', { message: item });
  }
  return (
    <NotificationsItemContainer>
      <Card
        actions={[
          <Badge badgeCount={unread ? 1 : 0} color='error' key='badge'>
            <IconButton
              icon={<Icon bundle='MaterialCommunityIcons' name={unread ? 'email' : 'email-outline'} />}
              onPress={onMessagePress}
            />
          </Badge>,
        ]}
        headerTitle={
          <Space spacing={1} direction='vertical'>
            <Typography variant='h3'>{item.$.SubjectNoHTML}</Typography>
            <Typography color='textSecondary'>By {item.$.From}</Typography>
          </Space>
        }></Card>
    </NotificationsItemContainer>
  );
};

export default React.memo(NotificationsItem);
