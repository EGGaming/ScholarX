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
import Flex from '@components/Flex/Flex';
import Skeleton from '@components/Skeleton/Skeleton';

const Event: React.FC<EventProps> = (props) => {
  if ('item' in props) {
    const { item } = props;
    const navigation = useRootNavigation();
    const parsedDate = Date.parse(item.Date);
    const title = format(parsedDate, 'EEEE, MMM do, yyyy');
    const upcomingEvents = useFutureEvents();

    const dateTitle: string = isToday(parsedDate)
      ? 'Today'
      : isTomorrow(parsedDate)
      ? 'Tomorrow'
      : formatDistance(parsedDate, new Date(new Date().toDateString()), { addSuffix: true });
    const titleColor: TypographyColors = isToday(parsedDate)
      ? 'error'
      : isTomorrow(parsedDate)
      ? 'warning'
      : 'secondary';
    function onPress() {
      navigation.navigate('EventViewer', { event: item, title });
    }

    const icon = React.useMemo(() => {
      switch (item.DayType) {
        case 'Holiday':
        case 'Regular':
        default:
          return <Icon bundle='MaterialCommunityIcons' name='bed-outline' color='secondary' size='card' />;
        case 'Assignment':
          return <Icon bundle='Feather' name='clock' color='primary' size='card' />;
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
      <Card onPress={onPress}>
        <Space spacing={1} direction='vertical'>
          <Flex justifyContent='space-between'>
            <EventIconContainer>{icon}</EventIconContainer>
            <Typography variant='caption' color={titleColor} bold>
              {dateTitle}
            </Typography>
          </Flex>
          <EventContentContainer>
            <Typography bold variant='h3'>
              {title}
            </Typography>
            <Typography color='textSecondary' variant='body2'>
              {secondaryText}
            </Typography>
          </EventContentContainer>
        </Space>
      </Card>
    );
  }
  if ('isSkeleton' in props) {
    const { isSkeleton } = props;
    if (isSkeleton)
      return (
        <Card>
          <Space spacing={1} direction='vertical'>
            <Flex justifyContent='space-between'>
              <EventIconContainer>
                <Skeleton.Circle preset='icon' size='large' />
              </EventIconContainer>
              <Skeleton.Typography width={80} variant='caption' />
            </Flex>
            <EventContentContainer>
              <Skeleton.Typography width={257} variant='h3' />

              <Skeleton.Typography width='50%' variant='body2' />
            </EventContentContainer>
          </Space>
        </Card>
      );
  }

  return null;
};

export default React.memo(Event);
