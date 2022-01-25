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

const Event: React.FC<EventProps> = ({ item, calendar }) => {
  const navigation = useRootNavigation();
  const parsedDate = Date.parse(item.Date);
  const title = format(parsedDate, 'EEE, MMM do, yyyy');
  const dateTitle: string = isToday(parsedDate)
    ? 'Today'
    : isTomorrow(parsedDate)
    ? 'Tomorrow'
    : formatDistance(parsedDate, new Date(new Date().toDateString()), { addSuffix: true });
  const titleColor: TypographyColors = isToday(parsedDate)
    ? 'error'
    : isTomorrow(parsedDate)
    ? 'warning'
    : 'textPrimary';
  const teacherName = item.Title.match(/\w+, \w/)?.toString();
  const className = teacherName ? (item.Title.match(/.*(?=( : ))/) ?? [''])[0].substring(teacherName.length + 2) : '';
  const assignmentName =
    className && teacherName
      ? item.Title?.substring(
          className.length + teacherName.length + 5,
          (item.Title.match(/.*(?=(  -))/) ?? [''])[0].length
        )
      : '';
  const chipColor: AppColors = (() => {
    switch (item.DayType) {
      case 'Holiday':
        return 'success';
      default:
        return 'primary';
    }
  })();

  function onPress() {
    navigation.navigate('EventViewer', { event: item, parsedDate, title, calendar });
  }

  return (
    <EventContainer>
      <EventIconContainer>
        {item.DayType === 'Assignment' ? (
          <Icon bundle='Feather' name='clipboard' color='primary' />
        ) : (
          <Icon bundle='Feather' name='calendar' color='textSecondary' />
        )}
      </EventIconContainer>
      <EventContentContainer>
        <Typography bold>{title}</Typography>
        <Space spacing={1} alignItems='center'>
          <Typography color='textSecondary' variant='body2'>
            {item.DayType}
          </Typography>
          <Space spacing={0.3} alignItems='center'>
            <Icon bundle='Feather' name='clock' color={titleColor} size='small' />
            <Typography variant='caption' color={titleColor}>
              {dateTitle}
            </Typography>
          </Space>
        </Space>
      </EventContentContainer>
      {item.DayType === 'Assignment' && (
        <EventActionsContainer>
          <IconButton icon={<Icon bundle='Feather' name='chevron-right' />} onPress={onPress} />
        </EventActionsContainer>
      )}
    </EventContainer>
  );
};

export default React.memo(Event);
