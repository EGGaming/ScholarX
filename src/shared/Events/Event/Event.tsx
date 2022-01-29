import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Typography from '@components/Typography/Typography';
import React from 'react';
import { EventActionsContainer, EventContainer, EventContentContainer, EventIconContainer } from './Event.base';
import { EventProps } from './Events.types';
import { format, isThisWeek, isToday, isTomorrow, formatDistance } from 'date-fns';
import { AppColors, TypographyColors } from '@theme/core.types';
import Space from '@components/Space/Space';
import Chip from '@components/Chip/Chip';
import { View } from 'react-native';
import { useAppTheme } from '@theme/core';
import { useRootNavigation } from '@navigators/Root/Root';
import { ButtonBase } from '@components/Button/Button.base';
import { useCalendar, useFutureEvents } from '@context/CalendarContext/CalendarContext';

const Event: React.FC<EventProps> = ({ item }) => {
  const navigation = useRootNavigation();
  const parsedDate = Date.parse(item.Date);
  const title = format(parsedDate, 'EEE, MMM do, yyyy');
  const upcomingEvents = useFutureEvents();

  const dateTitle: string = isToday(parsedDate)
    ? 'Today'
    : isTomorrow(parsedDate)
    ? 'Tomorrow'
    : formatDistance(parsedDate, new Date(new Date().toDateString()), { addSuffix: true });
  const titleColor: TypographyColors = isToday(parsedDate) ? 'error' : isTomorrow(parsedDate) ? 'warning' : 'secondary';
  function onPress() {
    navigation.navigate('EventViewer', { event: item, title });
  }

  const icon = React.useMemo(() => {
    switch (item.DayType) {
      case 'Holiday':
      case 'Regular':
      default:
        return <Icon bundle='MaterialCommunityIcons' name='bed-outline' color='secondary' />;
      case 'Assignment':
        return <Icon bundle='Feather' name='clock' color='primary' />;
    }
  }, [item.DayType]);

  const secondaryText = React.useMemo(() => {
    if (item.DayType === 'Assignment') {
      const numOfAssignments = upcomingEvents.filter((e) => e.Date === item.Date).length;
      if (numOfAssignments === 1) return `1 Assignment`;
      return `${numOfAssignments} Assignments`;
    }

    return item.DayType;
  }, [upcomingEvents, item.DayType]);

  return (
    <EventContainer onPress={onPress}>
      <EventIconContainer>{icon}</EventIconContainer>
      <EventContentContainer>
        <Typography bold>{title}</Typography>
        <Space spacing={1} alignItems='center'>
          <Typography color='textSecondary' variant='body2'>
            {secondaryText}
          </Typography>
          <Space spacing={0.3} alignItems='center'>
            <Icon bundle='Feather' name='clock' color={titleColor} size='small' />
            <Typography variant='caption' color={titleColor}>
              {item.DayType === 'Assignment' && 'Due '}
              {dateTitle}
            </Typography>
          </Space>
        </Space>
      </EventContentContainer>
    </EventContainer>
  );
};

export default React.memo(Event);
