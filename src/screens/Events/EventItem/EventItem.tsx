import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import ListItem from '@components/List/ListItem';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useCalendar, useFutureEvents } from '@context/CalendarContext/CalendarContext';
import { useRootNavigation } from '@navigators/Root/Root';
import { EventItemProps } from '@screens/Events/EventItem/EventItem.types';
import { TypographyColors } from '@theme/core.types';
import { format, formatDistance, isFuture, isPast, isToday, isTomorrow } from 'date-fns';
import React from 'react';

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const navigation = useRootNavigation();
  const parsedDate = Date.parse(event.Date);
  const title = format(parsedDate, 'EEE, MMM do, yyyy');
  const upcomingEvents = useFutureEvents();

  function onPress() {
    navigation.navigate('EventViewer', { event, title });
  }

  const dateTitle: string = isToday(parsedDate)
    ? 'Today'
    : isTomorrow(parsedDate)
    ? 'Tomorrow'
    : formatDistance(parsedDate, new Date(new Date().toDateString()), { addSuffix: true });
  const titleColor: TypographyColors = isToday(parsedDate) ? 'error' : isTomorrow(parsedDate) ? 'warning' : 'secondary';
  const headerColor: TypographyColors = isFuture(parsedDate) || isToday(parsedDate) ? 'textPrimary' : 'textSecondary';

  const icon = React.useMemo(() => {
    switch (event.DayType) {
      case 'Holiday':
      case 'Regular':
      default:
        return <Icon bundle='MaterialCommunityIcons' name='bed-outline' color='secondary' />;
      case 'Assignment':
        return <Icon bundle='Feather' name='clock' color='primary' />;
    }
  }, [event.DayType]);

  const secondaryText = React.useMemo(() => {
    if (event.DayType === 'Assignment') {
      const numOfAssignments = upcomingEvents.filter((e) => e.Date === event.Date).length;
      if (numOfAssignments === 1) return `1 Assignment`;
      return `${numOfAssignments} Assignments`;
    }

    return event.DayType;
  }, [upcomingEvents, event.DayType]);

  return (
    <ListItem onPress={onPress}>
      <Space spacing={1} alignItems='center'>
        <Flex shrink>{icon}</Flex>
        <Flex direction='column'>
          <Typography color={headerColor}>{secondaryText}</Typography>
          <Space spacing={0.3} alignItems='center'>
            <Icon bundle='Feather' name='clock' color={titleColor} size='small' />
            <Typography variant='caption' color={titleColor}>
              {event.DayType === 'Assignment' && 'Due '}
              {dateTitle}
            </Typography>
          </Space>
        </Flex>
      </Space>
      <Flex grow justifyContent='flex-end' alignItems='center'>
        <Flex direction='column' alignItems='center'>
          <Icon bundle='AntDesign' name='calendar' color='primary' size='large' />
          <Typography bold>{format(parsedDate, 'MMM dd')}</Typography>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default React.memo(EventItem);
