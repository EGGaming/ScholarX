import Badge from '@components/Badge/Badge';
import Button from '@components/Button/Button';
import { ButtonBase } from '@components/Button/Button.base';
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
  const parsedDate = React.useMemo(
    () => parse(item.$.BeginDate, 'MM/dd/yyyy HH:mm:ss', new Date()),
    [item.$.BeginDate]
  );
  const timestamp = React.useMemo(() => {
    if (isToday(parsedDate)) return format(parsedDate, 'h:m a');
    if (isYesterday(parsedDate)) return 'Yesterday';
    if (isThisWeek(parsedDate)) return formatDistanceToNow(parsedDate);
    if (isThisYear(parsedDate)) return format(parsedDate, 'MMM dd');
    return format(parsedDate, 'M/dd/yy');
  }, [item.$.BeginDate]);
  const unread = !JSON.parse(item.$.Read) as boolean;
  const navigation = useRootNavigation();
  function onMessagePress() {
    navigation.navigate('NotificationViewer', { message: item, parsedDate: parsedDate.getTime() });
  }
  return (
    <ButtonBase onPress={onMessagePress}>
      <NotificationsItemContainer read={unread}>
        <NotificationItemHeader>
          <Space spacing={1} alignItems='center'>
            <Icon bundle='FontAwesome5' name='user' />
            <Typography bold>{item.$.From}</Typography>
          </Space>
          <Typography variant='body2' color='textSecondary'>
            {timestamp}
          </Typography>
        </NotificationItemHeader>
        <Typography variant='body2' bold={unread} numberOfLines={1}>
          {item.$.SubjectNoHTML}
        </Typography>
        <Typography variant='body2' color='textSecondary' numberOfLines={1}>
          {item.$.Content.replace(/(<[^>]*>?)/gm, '').trim()}
        </Typography>
      </NotificationsItemContainer>
    </ButtonBase>
  );
};

export default NotificationsItem;
