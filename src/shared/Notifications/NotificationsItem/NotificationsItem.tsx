import Badge from '@components/Badge/Badge';
import Button from '@components/Button/Button';
import { ButtonBase, NativeButtonBase } from '@components/Button/Button.base';
import Card from '@components/Card/Card';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useRootNavigation } from '@navigators/Root/Root';
import {
  NotificationItemHeader,
  NotificationsItemContainer,
} from '@shared/Notifications/NotificationsItem/NotificationsItem.base';
import { NotificationsItemProps } from '@shared/Notifications/NotificationsItem/NotificationsItem.types';
import React from 'react';
import { parse, isToday, isThisWeek, format, isYesterday, formatDistanceToNow, isThisYear } from 'date-fns';

const NotificationsItem: React.FC<NotificationsItemProps> = ({ item }) => {
  const timestamp = React.useMemo(() => {
    if (isToday(item.beginDate)) return format(item.beginDate, 'h:m a');
    if (isYesterday(item.beginDate)) return 'Yesterday';
    if (isThisWeek(item.beginDate)) return formatDistanceToNow(item.beginDate);
    if (isThisYear(item.beginDate)) return format(item.beginDate, 'MMM dd');
    return format(item.beginDate, 'M/dd/yy');
  }, [item.beginDate]);
  const navigation = useRootNavigation();
  function onMessagePress() {
    navigation.navigate('NotificationViewer', { message: item, parsedDate: item.beginDate.getTime() });
  }
  return (
    <NativeButtonBase onPress={onMessagePress}>
      <NotificationsItemContainer read={!item.isRead()}>
        <NotificationItemHeader>
          <Space spacing={1} alignItems='center'>
            <Icon bundle='FontAwesome5' name='user' />
            <Typography bold>{item.from.name}</Typography>
          </Space>
          <Typography variant='body2' color='textSecondary'>
            {timestamp}
          </Typography>
        </NotificationItemHeader>
        <Typography variant='body2' bold={!item.isRead()} numberOfLines={1}>
          {item.subject.raw}
        </Typography>
        <Typography variant='body2' color='textSecondary' numberOfLines={1}>
          {item.htmlContent.replace(/(<[^>]*>?)/gm, '').trim()}
        </Typography>
      </NotificationsItemContainer>
    </NativeButtonBase>
  );
};

export default NotificationsItem;
